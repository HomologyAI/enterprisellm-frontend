import React from "react";
import {SVGComponent} from "@/components/BrowserIcon/types";

interface Props {
  size?: number;
}

const Icon = ({ ...props }: SVGComponent) => {
  return (
    <svg
      width="61" height="61" viewBox='0 0 61 61' fill="none" xmlns="http://www.w3.org/2000/svg"
      style={props.style}
    >
      <circle cx="30" cy="30" r="29" fill="white" stroke="#52A3FF" stroke-width="2"/>
      <g filter="url(#filter0_ii_114_3965)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.459 17C37.8525 17 50 20.1967 50 31.0656C50 42.5738 39.1312 45.1312 31.459 45.1312C27.8834 45.1312 23.5978 44.8945 19.8749 43.6067C19.1034 44.5042 18.296 45.3594 17.4589 46.1206C16.3153 47.1607 14.5873 47.1557 13.8065 45.8216C12.1276 42.9532 11 37.5327 11 31.0656C11 20.1967 21.8689 17 31.459 17Z" fill="white"/>
      </g>
      <path d="M19.8749 43.6067L20.2929 42.3983L19.4717 42.1142L18.9052 42.7732L19.8749 43.6067ZM17.4589 46.1206L16.5986 45.1747L16.5986 45.1747L17.4589 46.1206ZM13.8065 45.8216L12.7029 46.4675H12.7029L13.8065 45.8216ZM51.2787 31.0656C51.2787 25.0457 47.8721 21.1589 43.754 18.8425C39.6834 16.5528 34.8199 15.7213 31.459 15.7213V18.2787C34.4916 18.2787 38.8986 19.0456 42.5002 21.0714C46.0542 23.0706 48.7213 26.2166 48.7213 31.0656H51.2787ZM31.459 46.4099C35.3982 46.4099 40.2862 45.7595 44.2358 43.5271C48.2754 41.2439 51.2787 37.3227 51.2787 31.0656H48.7213C48.7213 36.3167 46.2902 39.4283 42.9774 41.3008C39.5744 43.2242 35.192 43.8525 31.459 43.8525V46.4099ZM19.4569 44.8152C23.3905 46.1758 27.854 46.4099 31.459 46.4099V43.8525C27.9128 43.8525 23.8052 43.6132 20.2929 42.3983L19.4569 44.8152ZM18.9052 42.7732C18.1582 43.6422 17.3874 44.4573 16.5986 45.1747L18.3193 47.0666C19.2046 46.2614 20.0486 45.3662 20.8445 44.4403L18.9052 42.7732ZM16.5986 45.1747C16.2581 45.4843 15.8695 45.6018 15.5688 45.5848C15.2976 45.5695 15.071 45.4508 14.9101 45.1757L12.7029 46.4675C13.3228 47.5266 14.3506 48.0774 15.4245 48.1381C16.469 48.1971 17.5162 47.797 18.3193 47.0666L16.5986 45.1747ZM14.9101 45.1757C13.4017 42.5985 12.2787 37.4501 12.2787 31.0656H9.72131C9.72131 37.6153 10.8536 43.3078 12.7029 46.4675L14.9101 45.1757ZM31.459 15.7213C26.5575 15.7213 21.198 16.5327 17.0161 18.837C12.755 21.185 9.72131 25.0975 9.72131 31.0656H12.2787C12.2787 26.1649 14.6795 23.0445 18.2503 21.0769C21.9003 19.0657 26.7704 18.2787 31.459 18.2787V15.7213Z" fill="#0066FF"/>
      <path d="M42.9672 32.3443C42.9672 25.9508 35.2951 24.6721 31.459 24.6721C27.6229 24.6721 19.3115 25.1654 19.3115 32.3443C19.3115 39.002 27.0147 37.9565 30.7229 36.728C31.5941 36.4394 32.574 36.4986 33.4327 36.8224C36.5694 38.0052 42.9672 38.8306 42.9672 32.3443Z" fill="#0066FF"/>
      <g filter="url(#filter1_i_114_3965)">
        <path d="M42.9672 32.3443C42.9672 25.9508 35.2951 24.6721 31.459 24.6721C27.6229 24.6721 19.3115 25.1654 19.3115 32.3443C19.3114 39.002 27.0147 37.9565 30.7229 36.728C31.5941 36.4394 32.574 36.4986 33.4327 36.8224C36.5694 38.0052 42.9672 38.8306 42.9672 32.3443Z" fill="#0066FF"/>
      </g>
      <path d="M28.2623 32.3442C28.2623 33.7566 27.6898 34.9016 26.9836 34.9016C26.2774 34.9016 25.7049 33.7566 25.7049 32.3442C25.7049 30.9318 25.7049 29.7869 26.9836 29.7869C28.2623 29.7869 28.2623 30.9318 28.2623 32.3442Z" fill="white"/>
      <path d="M37.2131 32.3442C37.2131 33.7566 36.6407 34.9016 35.9345 34.9016C35.2283 34.9016 34.6558 33.7566 34.6558 32.3442C34.6558 30.9318 34.6558 29.7869 35.9345 29.7869C37.2131 29.7869 37.2131 30.9318 37.2131 32.3442Z" fill="white"/>
      <path d="M18 20L16 16.5" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <g filter="url(#filter2_ii_114_3965)">
        <circle cx="14.5" cy="14.5" r="3.5" fill="#52A3FF"/>
      </g>
      <defs>
        <filter id="filter0_ii_114_3965" x="9.72131" y="12.7213" width="41.5574" height="38.4225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="3"/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.65 0 0 0 0 0.79 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_114_3965"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-3"/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.520833 0 0 0 0 0.7125 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_114_3965" result="effect2_innerShadow_114_3965"/>
        </filter>
        <filter id="filter1_i_114_3965" x="19.3115" y="21.6721" width="23.6558" height="15.9645" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-3"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0561979 0 0 0 0 0.0987187 0 0 0 0 0.1625 0 0 0 0.46 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_114_3965"/>
        </filter>
        <filter id="filter2_ii_114_3965" x="10" y="10" width="9" height="9" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="1"/>
          <feGaussianBlur stdDeviation="0.7"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.8125 0 0 0 0 0.8875 0 0 0 0 1 0 0 0 0.71 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_114_3965"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-1" dy="-1"/>
          <feGaussianBlur stdDeviation="0.9"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.113333 0 0 0 0 0.388 0 0 0 0 0.8 0 0 0 0.55 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_114_3965" result="effect2_innerShadow_114_3965"/>
        </filter>
      </defs>
    </svg>
  );
};


const BotAvatar = React.memo((props) => {
  const {
    size = 48,
  } = props;

  return (
    <Icon style={{
      height: size,
      width: size,
    }} />
  )
});

export default BotAvatar;