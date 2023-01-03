export const WatchListSvg = ({ height, width, stroke, fill }) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 20} viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7082 10.0013C17.7082 14.2588 14.2573 17.7096 9.99984 17.7096C5.74234 17.7096 2.2915 14.2588 2.2915 10.0013C2.2915 5.7438 5.74234 2.29297 9.99984 2.29297C14.2573 2.29297 17.7082 5.7438 17.7082 10.0013Z" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.8594 12.4524L9.71777 10.5782V6.53906" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
};
