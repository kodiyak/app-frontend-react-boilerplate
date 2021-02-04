import { Box, Image, BoxProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import constants from '../../configs/constants'

const MinimalistWallpaper: React.FC<BoxProps> = (props) => {
  const [src, setImage] = useState('')

  useEffect(() => {
    const minimalist = Math.floor(
      Math.random() * constants.theme.MINIMALIST_WALLPAPERS.length
    )

    setImage(constants.theme.MINIMALIST_WALLPAPERS[minimalist])
  }, [])

  return (
    <Box {...props}>
      <Image src={src} objectFit="cover" />
    </Box>
  )
}

export default MinimalistWallpaper
