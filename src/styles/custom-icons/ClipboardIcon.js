import { createIcon } from "@chakra-ui/react";

// using `path`
const ClipboardIcon = createIcon({
  displayName: "UpDownIcon",
  viewBox: "0 0 20 20",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M13.3334 0.833344H3.33335C2.41669 0.833344 1.66669 1.58334 1.66669 2.50001V14.1667H3.33335V2.50001H13.3334V0.833344ZM12.5 4.16668L17.5 9.16668V17.5C17.5 18.4167 16.75 19.1667 15.8334 19.1667H6.65835C5.74169 19.1667 5.00002 18.4167 5.00002 17.5L5.00835 5.83334C5.00835 4.91668 5.75002 4.16668 6.66669 4.16668H12.5ZM11.6667 10H16.25L11.6667 5.41668V10Z"
      fill="white"
    />
  ),
});
//w="20px" h="20px"
export default ClipboardIcon;
