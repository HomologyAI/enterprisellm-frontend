import React from "react";
import {SVGComponent} from "@/components/BrowserIcon/types";
import Image from 'next/image'

interface Props {
  size?: number;
}

const Icon = ({ ...props }: SVGComponent) => {
  return (
    <Image src={'/botAvatar.png'} width={40} height={40} />
  );
};


const BotAvatar = React.memo((props) => {
  const {
    size = 40,
  } = props;

  return (
    <Icon style={{
      height: size,
      width: size,
    }} />
  )
});

export default BotAvatar;