"use client";

import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import InputSearch from "@/components/core/inputSearch";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Filter,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Database,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BodyPengaturan() {
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        description="Kelola akun anda"
        titleMenuDashboard="Pengaturan"
      />

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <InputSearch
              loadingSearch={false}
              searchParams={params}
              onChange={() => {}}
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="w-6 h-6" />
            Profil Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                variant="outline"
              >
                <Camera className="w-3 h-3" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
              <Badge variant="outline" className="mt-1">
                Active
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nama Depan</Label>
              <Input id="firstName" placeholder="John" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nama Belakang</Label>
              <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                defaultValue="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Nomor Telepon
              </Label>
              <Input
                id="phone"
                placeholder="+62 812 3456 7890"
                defaultValue="+62 812 3456 7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tanggal Lahir
              </Label>
              <Input id="birthDate" type="date" defaultValue="1990-01-01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lokasi
              </Label>
              <Input
                id="location"
                placeholder="Jakarta, Indonesia"
                defaultValue="Jakarta, Indonesia"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              id="bio"
              label="Bio"
              placeholder="Ceritakan sedikit tentang diri Anda..."
              defaultValue="Saya adalah seorang administrator yang berpengalaman dalam mengelola sistem dan tim."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Keamanan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="currentPassword"
                className="flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                Password Saat Ini
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password saat ini"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Masukkan password baru"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Autentikasi Dua Faktor (2FA)</Label>
                <p className="text-sm text-muted-foreground">
                  Tingkatkan keamanan akun dengan 2FA
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Otomatis</Label>
                <p className="text-sm text-muted-foreground">
                  Ingat sesi login untuk 30 hari
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi melalui email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, email: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi push di browser
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, push: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi melalui SMS
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, sms: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Tampilan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select defaultValue="light">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">Sistem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Bahasa
              </Label>
              <Select defaultValue="id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ms">Bahasa Melayu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Animasi UI</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan animasi antarmuka
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Mode Compact</Label>
                <p className="text-sm text-muted-foreground">
                  Tampilkan lebih banyak konten dalam layar
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Database className="w-6 h-6" />
            Data & Privasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Analitik Penggunaan</Label>
              <p className="text-sm text-muted-foreground">
                Bantu kami meningkatkan layanan dengan berbagi data penggunaan
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Cookie Marketing</Label>
              <p className="text-sm text-muted-foreground">
                Izinkan cookie untuk personalisasi konten
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Unduh Data Saya
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              Hapus Akun
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 pb-8">
        <Button className="flex-1 sm:flex-none">
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Batalkan
        </Button>
      </div>
    </DashboardContentLayout>
  );
}
