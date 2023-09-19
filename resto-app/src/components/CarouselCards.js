import React, { useRef } from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const data =  [
  {
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5b6affa09f8770f8f6a43bc6/1533740042474-13B15B9LVD14IO2JGC7U/bady-qb-490183-unsplash.jpg",
  },
  {
    imageUrl: "https://media.istockphoto.com/id/1176929581/id/foto/sumpit-memegang-sushi-rolls-set-dengan-salmon-dan-cream-cheese-dan-cuccumber-di-black-slate.jpg?s=612x612&w=0&k=20&c=X-vfaobNPJwFoDfqgQa4Y-E2YOQkuBol6fTM5Yz9Eyc=",
  },
  {
    imageUrl: "https://cms.sehatq.com/public/img/article_img/kalori-sushi-ternyata-berbanding-terbalik-dari-ukurannya-yang-mini-1607013191.jpg",
  },
];
  const isCarousel = React.useRef(null)


  return (
    <View style={{backfaceVisibility:'hidden'}}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
        style={{position:'relative'}}
      />
      <Pagination
  dotsLength={data.length}
  activeDotIndex={index}
  carouselRef={isCarousel}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)'
  }}
  inactiveDotOpacity={0.4}
  inactiveDotScale={0.6}
        tappableDots={true}
        style={{position:'absolute'}}
/>
     
    </View>
  )
}


export default CarouselCards