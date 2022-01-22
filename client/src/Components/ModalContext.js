import { useContext, createContext, useState } from "react";

const ModalContext = createContext({ isOpen: true, setIsOpen: () => {} });
const ModalProvider = (props) => {
  const [open, setOpen] = useState(true);
  const value = { open, setOpen };
  return (
    <ModalContext.Provider value={value}>
      {props?.children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export default ModalProvider;
