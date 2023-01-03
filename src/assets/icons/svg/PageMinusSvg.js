export const PageMinusSvg = ({ height, width, stroke, fill }) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 20} viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2803 2.30472H6.73696C5.00363 2.29722 3.5828 3.67888 3.54196 5.41222V14.4531C3.5128 16.1614 4.87363 17.5706 6.5828 17.6006C6.63363 17.6006 6.6853 17.6006 6.73696 17.5989H13.3936C15.1178 17.5814 16.5045 16.1772 16.502 14.4531V6.70305L12.2803 2.30472Z" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.061 2.29297V4.71714C12.061 5.90047 13.0185 6.85964 14.2019 6.86297H16.4969" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.9105 11.4557H7.82715" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
};
