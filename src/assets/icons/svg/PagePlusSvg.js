export const PagePlusSvg = ({ height, width, stroke, fill }) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 20} viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2803 2.30471H6.73696C5.00363 2.29804 3.5828 3.67888 3.54196 5.41221V14.453C3.5128 16.1614 4.87363 17.5705 6.5828 17.6005C6.63363 17.6005 6.6853 17.6005 6.73696 17.5989H13.3936C15.1178 17.5814 16.5045 16.1772 16.502 14.453V6.70304L12.2803 2.30471Z" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.0615 2.29297V4.71714C12.0615 5.90047 13.019 6.85964 14.2024 6.86297H16.4974" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.9115 10.7643H7.82812" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.87028 12.806V8.72266" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
};
