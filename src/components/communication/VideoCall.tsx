import { useState, useRef, useEffect } from 'react'
import { Video, Mic, MicOff, VideoOff, PhoneOff, Settings, Users, Monitor, MonitorOff, Circle, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockTeamMembers } from '@/lib/data/team'
import wsService from '@/lib/services/websocket'

interface Participant {
  id: string
  name: string
  avatar?: string
  stream?: MediaStream
  screenStream?: MediaStream
  isMuted: boolean
  isVideoOff: boolean
  isScreenSharing: boolean
}

interface VideoCallProps {
  channelId: string
  onClose: () => void
}

export function VideoCall({ channelId, onClose }: VideoCallProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({})

  useEffect(() => {
    // Initialize local media stream
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        localStreamRef.current = stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        // Add current user to participants
        const currentUser = mockTeamMembers.find((m) => m.id === '1')
        if (currentUser) {
          setParticipants([
            {
              id: currentUser.id,
              name: currentUser.name,
              avatar: currentUser.avatar,
              stream,
              isMuted: false,
              isVideoOff: false,
              isScreenSharing: false,
            },
          ])
        }

        // Join video call room
        wsService.send('joinVideoCall', { channelId })
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    initializeMedia()

    // Subscribe to WebRTC signaling events
    const unsubscribeOffer = wsService.subscribe('offer', handleOffer)
    const unsubscribeAnswer = wsService.subscribe('answer', handleAnswer)
    const unsubscribeIceCandidate = wsService.subscribe('iceCandidate', handleIceCandidate)
    const unsubscribeParticipantJoined = wsService.subscribe('participantJoined', handleParticipantJoined)
    const unsubscribeParticipantLeft = wsService.subscribe('participantLeft', handleParticipantLeft)

    return () => {
      unsubscribeOffer()
      unsubscribeAnswer()
      unsubscribeIceCandidate()
      unsubscribeParticipantJoined()
      unsubscribeParticipantLeft()
      // Clean up media streams
      localStreamRef.current?.getTracks().forEach((track) => track.stop())
      Object.values(peerConnections.current).forEach((pc) => pc.close())
    }
  }, [channelId])

  const handleOffer = async (data: { offer: RTCSessionDescriptionInit; from: string }) => {
    const { offer, from } = data
    const pc = createPeerConnection(from)
    await pc.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    wsService.send('answer', { answer, to: from })
  }

  const handleAnswer = async (data: { answer: RTCSessionDescriptionInit; from: string }) => {
    const { answer, from } = data
    const pc = peerConnections.current[from]
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer))
    }
  }

  const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit; from: string }) => {
    const { candidate, from } = data
    const pc = peerConnections.current[from]
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate))
    }
  }

  const handleParticipantJoined = (participantId: string) => {
    const participant = mockTeamMembers.find((m) => m.id === participantId)
    if (participant) {
      setParticipants((prev) => [
        ...prev,
        {
          id: participant.id,
          name: participant.name,
          avatar: participant.avatar,
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
        },
      ])
      createPeerConnection(participantId)
    }
  }

  const handleParticipantLeft = (participantId: string) => {
    const pc = peerConnections.current[participantId]
    if (pc) {
      pc.close()
      delete peerConnections.current[participantId]
    }
    setParticipants((prev) => prev.filter((p) => p.id !== participantId))
  }

  const createPeerConnection = (participantId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    })

    // Add local stream tracks to peer connection
    localStreamRef.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current!)
    })

    // Handle incoming tracks
    pc.ontrack = (event) => {
      const participant = participants.find((p) => p.id === participantId)
      if (participant) {
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === participantId
              ? { ...p, stream: event.streams[0] }
              : p
          )
        )
      }
    }

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        wsService.send('iceCandidate', {
          candidate: event.candidate,
          to: participantId,
        })
      }
    }

    peerConnections.current[participantId] = pc
    return pc
  }

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      audioTrack.enabled = !audioTrack.enabled
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      videoTrack.enabled = !videoTrack.enabled
      setIsVideoOff(!isVideoOff)
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
        screenStreamRef.current = screenStream

        // Add screen share track to all peer connections
        Object.values(peerConnections.current).forEach((pc) => {
          screenStream.getTracks().forEach((track) => {
            pc.addTrack(track, screenStream)
          })
        })

        // Update local participant state
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === '1'
              ? { ...p, screenStream, isScreenSharing: true }
              : p
          )
        )
      } else {
        // Stop screen sharing
        screenStreamRef.current?.getTracks().forEach((track) => track.stop())
        screenStreamRef.current = null

        // Remove screen share track from all peer connections
        Object.values(peerConnections.current).forEach((pc) => {
          pc.getSenders().forEach((sender) => {
            if (sender.track?.kind === 'video' && sender.track.label.includes('screen')) {
              pc.removeTrack(sender)
            }
          })
        })

        // Update local participant state
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === '1'
              ? { ...p, screenStream: undefined, isScreenSharing: false }
              : p
          )
        )
      }
      setIsScreenSharing(!isScreenSharing)
    } catch (error) {
      console.error('Error toggling screen share:', error)
    }
  }

  const toggleRecording = async () => {
    try {
      if (!isRecording) {
        // Start recording
        const stream = new MediaStream()
        participants.forEach((participant) => {
          if (participant.stream) {
            participant.stream.getTracks().forEach((track) => {
              stream.addTrack(track)
            })
          }
        })

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp8,opus',
        })
        mediaRecorderRef.current = mediaRecorder
        recordedChunksRef.current = []

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: 'video/webm',
          })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `call-recording-${new Date().toISOString()}.webm`
          a.click()
          URL.revokeObjectURL(url)
        }

        mediaRecorder.start()
      } else {
        // Stop recording
        mediaRecorderRef.current?.stop()
      }
      setIsRecording(!isRecording)
    } catch (error) {
      console.error('Error toggling recording:', error)
    }
  }

  const handleEndCall = () => {
    // Clean up media streams and connections
    localStreamRef.current?.getTracks().forEach((track) => track.stop())
    Object.values(peerConnections.current).forEach((pc) => pc.close())
    wsService.send('leaveVideoCall', { channelId })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Video Call</h2>
        <Button variant="ghost" size="icon" onClick={handleEndCall}>
          <PhoneOff className="h-5 w-5 text-destructive" />
        </Button>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="relative rounded-lg overflow-hidden bg-accent"
            >
              {(participant.screenStream || participant.stream) ? (
                <video
                  ref={participant.id === '1' ? localVideoRef : undefined}
                  srcObject={participant.screenStream || participant.stream}
                  autoPlay
                  playsInline
                  muted={participant.id === '1'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {participant.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded-full text-sm">
                {participant.name}
              </div>
              {participant.isScreenSharing && (
                <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Monitor className="h-4 w-4" />
                  <span>Screen sharing</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? 'destructive' : 'secondary'}
            size="icon"
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant={isVideoOff ? 'destructive' : 'secondary'}
            size="icon"
            onClick={toggleVideo}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button
            variant={isScreenSharing ? 'destructive' : 'secondary'}
            size="icon"
            onClick={toggleScreenShare}
          >
            {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
          </Button>
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            size="icon"
            onClick={toggleRecording}
          >
            {isRecording ? <Square className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
          </Button>
          <Button variant="secondary" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Participants List */}
      {showParticipants && (
        <div className="absolute right-4 top-16 w-64 bg-background border rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Participants</h3>
          </div>
          <ScrollArea className="h-64">
            <div className="p-4 space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center space-x-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {participant.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{participant.name}</span>
                  {participant.isMuted && (
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  {participant.isVideoOff && (
                    <VideoOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
} 