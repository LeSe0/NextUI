import type { GetStaticPropsContext, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Dropdown, Grid } from "@nextui-org/react";
import React from "react";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation("common");

  const [selected, setSelected] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Grid.Container justify="flex-end">
      <Grid>
        {t("hello")}
        <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={(e) => setSelected(e as Set<string>)}
          >
            <Dropdown.Item key="text">Text</Dropdown.Item>
            <Dropdown.Item key="number">Number</Dropdown.Item>
            <Dropdown.Item key="date">Date</Dropdown.Item>
            <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
            <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button flat>Flat</Dropdown.Button>
          <Dropdown.Menu aria-label="Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error" withDivider>
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context?.locale ?? "", ["common"])),
    },
  };
}

export default Home;
