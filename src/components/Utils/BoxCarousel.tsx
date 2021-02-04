import { Box, BoxProps, Center } from '@chakra-ui/react'
import React, { useRef, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { BiRightArrowAlt as RightArrowIcon } from '@react-icons/all-files/bi/BiRightArrowAlt'
import { BiLeftArrowAlt as LeftArrowIcon } from '@react-icons/all-files/bi/BiLeftArrowAlt'

interface CarouselButtonProps extends BoxProps {
  direction: 'left' | 'right'
}

const CarouselButton: React.FC<CarouselButtonProps> = ({ direction, ...rest }) => {
  return (
    <Center
      w={20}
      h="100%"
      pos="absolute"
      top={0}
      cursor="pointer"
      userSelect="none"
      zIndex={10}
      {...rest}
    >
      {direction === 'left' ? (
        <LeftArrowIcon size={32} />
      ) : (
        <RightArrowIcon size={32} />
      )}
    </Center>
  )
}

export const CarouselRow: React.FC<BoxProps> = (props) => {
  return <Box w="100%" {...props} />
}

interface BoxCarouselProps {
  countSliders: number
  onChange?: (slide: number) => any
}

const BoxCarousel: React.FC<BoxCarouselProps> = ({
  children,
  countSliders,
  onChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<Carousel>(null)

  useEffect(() => {
    setTimeout(() => {
      carouselRef.current?.setPosition(1, true)
      carouselRef.current?.setPosition(0, true)
    }, 400)
  }, [])

  return (
    <Box d="flex" flexDir="column" overflow="hidden">
      <Box pos="relative">
        {currentSlide > 0 && (
          <CarouselButton
            left={0}
            direction="left"
            onClick={() => {
              carouselRef.current?.decrement()
            }}
          />
        )}
        {currentSlide + 1 < countSliders && (
          <CarouselButton
            right={0}
            direction="right"
            onClick={() => {
              carouselRef.current?.increment()
            }}
          />
        )}
        <Carousel
          ref={carouselRef}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          emulateTouch={true}
          className={'slide__anime-carousel'}
          onChange={(slide) => {
            setCurrentSlide(slide)
            onChange?.(slide)
          }}
        >
          {children as any}
        </Carousel>
      </Box>
    </Box>
  )
}

export default BoxCarousel
