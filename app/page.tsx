"use client"

import { useEffect, useState } from "react"
import { Heart, MapPin, Clock, Utensils, Home, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function AnniversaryInvitation() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [wish, setWish] = useState("")
  const [locations, setLocations] = useState<string[]>([]) 
  const [wishes, setWishes] = useState<string[]>([]) 
  const [isLocationSaved, setIsLocationSaved] = useState(false)
  const [isWishSaved, setIsWishSaved] = useState(false)



 // Fetch lokasi
  const fetchLocation = async () => {
    try {
      const res = await fetch("/api/data?type=location")
      const result = await res.json()
      const values = result.data?.map((row: any[]) => row[0]) || []
      setLocations(values)
      if (values[0]) {
        setPickupLocation(values[0])
        setIsLocationSaved(true)
      }
    } catch (err) {
      console.error("Error fetching location:", err)
    }
  }

  // Fetch wish
  const fetchWish = async () => {
    try {
      const res = await fetch("/api/data?type=wish")
      const result = await res.json()
      const values = result.data?.map((row: any[]) => row[0]) || []
      setWishes(values)
      if (values[0]) {
        setWish(values[0])
        setIsWishSaved(true)
      }
    } catch (err) {
      console.error("Error fetching wish:", err)
    }
  }


  useEffect(() => {
    fetchLocation();
    fetchWish();
  }, []);

  // Save lokasi
  const handleSaveLocation = async () => {
    if (pickupLocation.trim()) {
      try {
        await fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "location", value: pickupLocation }),
        });
        setIsLocationSaved(true);
        setPickupLocation("");
        fetchLocation();
      } catch (err) {
        console.error("Error saving location:", err);
      }
    }
  };

  // Save wish
  const handleSaveWish = async () => {
    if (wish.trim()) {
      try {
        await fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "wish", value: wish }),
        });
        setIsWishSaved(true);
        fetchWish();
      } catch (err) {
        console.error("Error saving wish:", err);
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-background px-4 py-8 md:py-12 overflow-hidden">
     <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating hearts decoration */}
        <div className="absolute top-20 left-4 opacity-10">
          <Heart className="h-16 w-16 fill-accent text-accent" />
        </div>
        <div className="absolute top-40 right-8 opacity-10">
          <Heart className="h-12 w-12 fill-primary text-primary" />
        </div>
        <div className="absolute bottom-40 left-8 opacity-10">
          <Heart className="h-20 w-20 fill-secondary text-secondary" />
        </div>
        <div className="absolute bottom-20 right-4 opacity-10">
          <Sparkles className="h-14 w-14 text-muted" />
        </div>

        {/* Organic curved lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q150,50 300,100 T600,100" stroke="#FFDCDC" strokeWidth="2" fill="none" />
          <path d="M0,300 Q200,250 400,300 T800,300" stroke="#FFE8CD" strokeWidth="2" fill="none" />
        </svg>

        {/* Dot pattern */}
        <div className="absolute top-1/4 right-1/4 grid grid-cols-3 gap-3 opacity-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-accent" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Heart className="h-12 w-12 fill-accent text-accent animate-pulse" />
          </div>
          <h1
            className="mb-11 text-6xl font-extrabold tracking-tight text-foreground text-balance"
            style={{ fontFamily: "var(--font-conrithia)" }}
          >
            Happy Anniversary Sayang!
          </h1>
          <p className="text-sm text-muted-foreground " style={{ fontFamily: "var(--font-noto-sans-math)" }}>
            Gakerasa udah 1 taun bareng (aslinya kerasa banget)
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-primary/30 via-card to-secondary/30 p-6 shadow-lg border-2 border-accent/30">
          <div className="flex justify-center mb-3">
            <div className="flex gap-1">
              <Heart className="h-7 w-7 fill-accent text-accent animate-pulse" />
              <Sparkles className="h-7 w-7 text-primary" />
              <Heart className="h-7 w-7 fill-accent text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          <h1 className="text-center text-xl font-bold">WISH DARI AKMAL!!</h1>
          <p className="font-sans text-base leading-relaxed text-foreground text-center text-balance">
            Happy anniversary, sayangku. Gila ya, sabar banget kamu udah tahan sama aku selama ini. Padahal aku tau sih…
            tiap hari jatuh cinta sama aku itu pasti capek, kan? 😌✌️ Tapi tenang aja, aku janji masih bakal bikin kamu
            ketawa-ketawa ama marah-marah random sampe anniversary taun depan❤️.
          </p>
          <div className="flex justify-center mt-4 gap-2">
            <span className="font-bold">-Akmal 😌</span>
          </div>
        </Card>
        
        <Card className="mb-8 bg-gradient-to-br from-primary/30 via-card to-secondary/30 p-6 shadow-lg border-2 border-accent/30">
          <div className="flex justify-center mb-3">
            <div className="flex gap-1">
              <Heart className="h-7 w-7 fill-accent text-accent animate-pulse" />
              <Sparkles className="h-7 w-7 text-primary" />
              <Heart className="h-7 w-7 fill-accent text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          <h1 className="text-center text-xl font-bold">Bikin Wish Juga Dong</h1>
          {!isWishSaved ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Masukkin wish kamu..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                className="h-32 bg-input text-foreground border-border"
              />
              <Button
                onClick={handleSaveWish}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-medium"
                disabled={!wish.trim()}
              >
                Simpan Wish!
              </Button>
            </div>
          ) : (
            <div className="rounded-lg bg-secondary/50 p-3 border border-secondary">
              <p className="text-sm font-medium text-secondary-foreground">{wish}</p>
              <button
                onClick={() => setIsWishSaved(false)}
                className="mt-2 text-xs text-accent-foreground hover:underline font-medium"
              >
                Edit Wish
              </button>
            </div>
          )}
          <div className="flex justify-center mt-4 gap-2">
            <p className="font-bold">-Tarisa ❤️</p>
          </div>
        </Card>

        {/* Date Card */}
        <Card className="mb-6 bg-gradient-to-br from-primary to-secondary p-6 text-center shadow-md border-none">
          <p className="mb-1 text-sm uppercase tracking-wider text-foreground/70">Sabtu</p>
          <p className="mb-1 font-serif text-5xl font-light text-foreground">11</p>
          <p className="text-lg text-foreground/80">Oktober 2025</p>
        </Card>

        {/* Dress Code */}
        <Card className="mb-8 bg-gradient-to-br from-foreground to-foreground/90 p-6 text-center shadow-md border-none">
          <h2 className="mb-2 font-serif text-xl font-light text-background">Dress Code</h2>
          <p className="text-background/90">
            <span className="font-semibold">outfit nuansa hitam</span>
          </p>
        </Card>

        {/* Rundown */}
        <div className="mb-6">
          <h2 className="mb-6 text-center font-serif text-2xl font-light text-foreground">Rundown Acara</h2>

          {/* Pickup Location */}
          <div className="mb-5">
            <Card className="bg-card p-5 shadow-md border-accent/20">
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-1 rounded-full bg-accent/30 p-2.5">
                  <MapPin className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-sans text-lg font-semibold text-foreground">Penjemputan</h3>
                  <p className="mb-3 text-sm text-muted-foreground">Lokasi penjemputan</p>
                  {!isLocationSaved ? (
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder={pickupLocation || "Masukkan lokasi..."}
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="bg-input text-foreground border-border"
                      />
                      <Button
                        onClick={handleSaveLocation}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-medium"
                        disabled={!pickupLocation.trim()}
                      >
                        Simpan Lokasi
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-secondary/50 p-3 border border-secondary">
                      <p className="text-sm font-medium text-secondary-foreground">{pickupLocation}</p>
                      <button
                        onClick={() => setIsLocationSaved(false)}
                        className="mt-2 text-xs text-accent-foreground hover:underline font-medium"
                      >
                        Ubah lokasi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Jakarta Aquarium */}
          <div className="mb-5">
            <Card className="bg-card p-5 shadow-md border-primary/20">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/40 p-2.5">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-sans text-lg font-semibold text-foreground">Jakarta Aquarium Safari</h3>
                  <p className="mb-2 text-sm text-muted-foreground font-medium">15.00 - 17.00 WIB</p>
                  <div className="rounded-lg bg-primary/20 px-3 py-2 border border-primary/30">
                    <p className="text-xs text-foreground">wishlist dari jaman kita masi baru kenal keknya</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Umaku Sushi */}
          <div className="mb-5">
            <Card className="bg-card p-5 shadow-md border-secondary/20">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-secondary/50 p-2.5">
                  <Utensils className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-sans text-lg font-semibold text-foreground">Umaku Sushi Bintaro</h3>
                  <p className="mb-2 text-sm text-muted-foreground font-medium">18.30 WIB - Selesai</p>
                  <div className="space-y-1 rounded-lg bg-secondary/20 px-3 py-2 border border-secondary/30">
                    <p className="text-xs text-foreground">
                      <span className="font-semibold">Perjalanan:</span> ±40 menit (24 KM)
                    </p>
                    <p className="text-xs text-foreground">Makan malam romantis dengan sushi favorit</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Return Home */}
          <div className="mb-6">
            <Card className="bg-card p-5 shadow-md border-muted/20">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-muted/40 p-2.5">
                  <Home className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-sans text-lg font-semibold text-foreground">Pulang ke Kos</h3>
                  <p className="mb-2 text-sm text-muted-foreground font-medium">Setelah makan malam</p>
                  <div className="rounded-lg bg-muted/20 px-3 py-2 border border-muted/30">
                    <p className="text-xs text-foreground">
                      <span className="font-semibold">Perjalanan:</span> ±35 menit (18 KM)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="mb-4 flex justify-center gap-2">
            <Heart className="h-5 w-5 fill-accent text-accent animate-pulse" />
            <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: "0.3s" }} />
            <Heart className="h-5 w-5 fill-accent text-accent animate-pulse" style={{ animationDelay: "0.6s" }} />
          </div>
          <p className="font-serif text-sm italic text-muted-foreground text-balance leading-relaxed">
            Sekali lagi makasi ya sayang udah mau nemenin aku di masa sekarang walopun banyak marah-marahnya. semoga
            kita tetep awet sampe target kita di umur 27 itu.
          </p>
          <div className="mt-4 text-2xl">💕</div>
        </div>
      </div>
    </main>
  )
}
