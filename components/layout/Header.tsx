import React, { useEffect, useState } from "react";

// images
import Logo from "@images/logo.svg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Input, Navbar } from "@nextui-org/react";
import Select from "components/common/Select";

export default function Header() {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("English");

  useEffect(() => {
    if (activeLanguage === "English") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ru");
    }
  }, [activeLanguage]);

  return (
    <Navbar
      variant="static"
      shouldHideOnScroll
      height="80"
      css={{
        "& .nextui-navbar-container": {
          display: "flex",
          alignItems: "center",
          px: "40px",
          py: "20px",
        },
      }}
    >
      <Navbar.Brand>
        <Image src={Logo.src} css={{ width: "140px", mb: "-8px" }} />
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item css={{ mr: "30px" }}>
          <Input
            type="text"
            contentClickable
            contentRight={<FontAwesomeIcon icon={faSearch} color="white" />}
          />
        </Navbar.Item>
        <Navbar.Item
          css={{ width: "130px", display: "flex", justifyContent: "center" }}
        >
          <Select
            handleOpen={() => setOpen(true)}
            handleClose={() => setOpen(false)}
            isOpen={isOpen}
            title={activeLanguage}
            items={["English", "Russian"]}
            setActiveElement={setActiveLanguage}
          />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
