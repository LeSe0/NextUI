import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Grid, keyframes, Text } from "@nextui-org/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  title: string;
  isOpen: boolean;
  handleOpen(): void;
  handleClose(): void;
  items: string[];
  selectWidth?: string | number;
  selectHeight?: string | number;
  selectSize?: string | number;
  setActiveElement: Dispatch<SetStateAction<string>>;
  radius?: string | number;
}

const appearAnimation = keyframes({
  "0%": { transform: "scale(0)", opacity: "0" },
  "80%": { transform: "scale(1.1)" },
  "100%": { transform: "scale(1)", opacity: "1" },
});

const disAppearAnimation = keyframes({
  "0%": { transform: "scale(1)" },
  "40%": { transform: "scale(0.8)" },
  "80%": { transform: "scale(0.4)" },
  "100%": { transform: "scale(0)" },
});

export default function Select({
  title,
  isOpen,
  items,
  handleOpen,
  handleClose,
  selectWidth = "110px",
  selectHeight = "max-content",
  selectSize,
  setActiveElement,
  radius = "20px",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const handleOnClose = (el: string) => {
    setActiveElement(el);
    handleClose();
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return window.removeEventListener("click", handleClose);
  }, [isOpen]);

  return (
    <Container css={{ m: 0, p: 0 }}>
      <Button
        onPress={isOpen ? handleClose : handleOpen}
        ref={ref}
        css={{
          width: "max-content",
          minWidth: "100px",
          height: "40px",
          p: 0,
          m: 0,
          textAlign: "center",
          "&:hover": {
            background: "#16181A",
          },
          "& span": {
            width: "100%",
            justifyContent: "space-evenly !important",
          },
        }}
        aria-label="select"
      >
        {title}
        <FontAwesomeIcon icon={faEarthEurope} />
      </Button>
      <Grid.Container
        onClick={(e) => e.stopPropagation()}
        gap={1}
        css={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          width: selectSize ?? selectWidth,
          height: selectSize ?? selectHeight,
          background: "$colors$secondary",
          borderRadius: radius,
          position: "absolute",
          px: "10px",
          left: Number(ref?.current?.offsetLeft) - 5 + "px",
          top: ref?.current?.offsetTop + "50px",
          animation: `${appearAnimation} 400ms`,
        }}
      >
        {items.map((el) => (
          <Grid
            key={`select-item_${el}`}
            onClick={() => handleOnClose(el)}
            css={{
              transition: "0.5s",
              borderRadius: "10px",
              pl: "10px",
              my: "3px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(18,18,19,0.7)",
                transition: "0.5s",
              },
            }}
          >
            <Text color="white">{el}</Text>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}
