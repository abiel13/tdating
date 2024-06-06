"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { reviews } from "@/constants/reviews";
import { Separator } from "./ui/separator";

const FooterCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-[90%] md:w-[70%]  h-full "
    >
      <CarouselContent className="h-full">
        {reviews.map((i, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-black">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col  gap-4 justify-between">
                    <div className="h-[10%]">
                      <h2 className="font-bold text-xl text-white ">{i.userName}</h2>
                      <Separator />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{i.review}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FooterCarousel;
