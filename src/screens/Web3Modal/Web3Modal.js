import { useState, useEffect } from "react";
import ConnectorItem from "./ConnectorItem";
import { Modal, Grid } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";

const Web3Modal = ({ setVisible, setProviderTitle, ...rest }) => {
  const itemList = [
    {
      icon: "metamask.svg",
      title: "Metamask",
    },
    {
      icon: "walletconnect.svg",
      title: "Wallet Connect",
    },
    {
      icon: "BSCWallet.png",
      title: "BSC Wallet",
    },
  ];
  const {
    account,
  } = useWeb3React();

  const onConnectClick = (title) => {
      setProviderTitle(title)
      setVisible(false);
  };

  useEffect(() => {
    if (account) setVisible(false);
  }, [account, setVisible]);

  return (
    <Modal width="500px" {...rest}>
      <Modal.Title>Connect Wallet</Modal.Title>
      <Modal.Content>
        <Grid.Container gap={2}>
          {itemList.map(({ icon, title}, index) => {

            return (
              <Grid xs={12} key={index}>
                <ConnectorItem
                  icon={icon}
                  disabled={title === "Metamas"}
                  title={title}
                  onClick={() => onConnectClick(title)}
                />
              </Grid>
            );
          })}
        </Grid.Container>
      </Modal.Content>
    </Modal>
  );
};

export default Web3Modal;
