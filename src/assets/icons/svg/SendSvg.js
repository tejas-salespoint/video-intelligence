export const SendSvg = ({ height, width, stroke, fill }) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 20} viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg">
    <path d="M13.1937 6.81219L8.4242 11.6327L2.99953 8.23973C2.22229 7.75345 2.38397 6.57286 3.2631 6.31577L16.1427 2.54397C16.9477 2.30802 17.6938 3.06069 17.4546 3.86833L13.6442 16.739C13.3832 17.6193 12.2093 17.7766 11.7277 16.996L8.42167 11.6335" stroke={stroke ? stroke : "white"} stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  );
};
