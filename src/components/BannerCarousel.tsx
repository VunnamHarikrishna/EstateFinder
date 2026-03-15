"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function BannerCarousel() {
  const banners = PlaceHolderImages.filter(img => img.id.startsWith('banner'));

  return (
    <div className="w-full relative overflow-hidden rounded-2xl">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[250px] md:h-[400px] w-full">
                <Image
                  src={banner.imageUrl}
                  alt={banner.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={banner.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12">
                  <Badge className="w-fit mb-2 bg-accent text-white border-none">Limited Offer</Badge>
                  <h2 className="text-white text-2xl md:text-5xl font-headline font-bold mb-2">
                    {index === 0 ? "Unlock Your Dream Space" : index === 1 ? "Modern Living, Timeless Style" : "Prime Plots Available"}
                  </h2>
                  <p className="text-white/80 text-sm md:text-lg max-w-xl">
                    Exclusive discounts on pre-bookings this weekend only. Speak to our agents today.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}