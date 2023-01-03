export const EditSvg = ({ height, width, stroke, fill }) => {
    return (
      <svg
        width={width ? width : 20}
        height={height ? height : 20}
        viewBox="0 0 20 20"
        fill={fill ? fill : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.57699 2.32422H6.46116C3.89866 2.32422 2.29199 4.13839 2.29199 6.70672V13.6351C2.29199 16.2034 3.89116 18.0176 6.46116 18.0176H13.8145C16.3853 18.0176 17.9845 16.2034 17.9845 13.6351V10.2784"
          stroke={stroke ? stroke : "white"}
          stroke-opacity="0.85"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.35652 9.10172L13.584 2.87422C14.3599 2.09922 15.6174 2.09922 16.3932 2.87422L17.4074 3.88839C18.1832 4.66422 18.1832 5.92255 17.4074 6.69755L11.1499 12.9551C10.8107 13.2942 10.3507 13.4851 9.87069 13.4851H6.74902L6.82736 10.3351C6.83902 9.87172 7.02819 9.43005 7.35652 9.10172Z"
          stroke={stroke ? stroke : "white"}
          stroke-opacity="0.85"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6377 3.83594L16.4427 7.64094"
          stroke={stroke ? stroke : "white"}
          stroke-opacity="0.85"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  