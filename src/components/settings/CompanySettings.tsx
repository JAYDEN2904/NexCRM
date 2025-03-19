import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface CompanyProfile {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  logo: string;
}

const defaultProfile: CompanyProfile = {
  name: "Acme Corporation",
  description: "Leading provider of innovative solutions",
  website: "https://acme.com",
  email: "contact@acme.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Business Ave",
    city: "Tech City",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  logo: "https://api.dicebear.com/7.x/shapes/svg?seed=acme",
};

export function CompanySettings() {
  const [profile, setProfile] = useState<CompanyProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Company Profile</h3>
          <p className="text-muted-foreground">
            Manage your company information and branding
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Basic information about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.logo} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Your company's physical location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={profile.address.street}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      address: { ...profile.address, street: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.address.city}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, city: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profile.address.state}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, state: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={profile.address.zip}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, zip: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.address.country}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, country: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
} 