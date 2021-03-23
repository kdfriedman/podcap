import { useStoreState, useStoreActions } from "easy-peasy";

import { Textarea } from "@chakra-ui/react";

const SectionInput = () => {
  const sectionInputValueStore = useStoreState((state) => state.sectionInput);
  const updateSectionInputValueStore = useStoreActions(
    (actions) => actions.updateSectionInputValue
  );

  console.log(sectionInputValueStore);

  return (
    <>
      {/* Textarea for accordion text input */}
      <Textarea
        placeholder="Enter show notes..."
        minH="180px"
        mt="8px"
        resize="none"
        pb={4}
      />
    </>
  );
};

export default SectionInput;
