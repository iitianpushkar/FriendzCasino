"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect,useDisconnect } from "wagmi";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";
import { useAccount } from "wagmi";

const GRADIENT_BORDER_WIDTH = 2;

const buttonStyles: React.CSSProperties = {
  background: "transparent",
  border: "1px solid transparent",
  boxSizing: "border-box" as const,
};

const contentWrapperStyle: React.CSSProperties = {
  position: "relative" as const,
};

function Gradient({ children, style, isAnimationDisabled = false }: { 
  children: React.ReactNode;
  style?: React.CSSProperties;
  isAnimationDisabled?: boolean;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

export function BlackCreateWalletButton({ height = 44, width = 180 }) {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  const {disconnect} = useDisconnect()

  const buttonHeight =  height;
  const buttonWidth = width;
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: "flex" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        backgroundColor: "black",
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: "border-box" as const,
        overflow: "hidden" as const,
      },
      gradient: {
        background:
          "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
        position: "absolute",
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      } as  React.CSSProperties,
      buttonBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        borderRadius: buttonHeight / 2,
        position: "relative",
        paddingRight: 10,
      } as React.CSSProperties,
    }),
    [buttonHeight, buttonWidth, gradientDiameter]
  );

  const createWallet = useCallback(() => {

    if(account.isConnected){    
        disconnect();
    }
    else{
        const coinbaseWalletConnector = connectors.find(
            (connector) => connector.id === "coinbaseWalletSDK"
          );
          if (coinbaseWalletConnector) {
            connect({ connector: coinbaseWalletConnector });
          }
    }
  }, [account.isConnected,connectors, connect,disconnect]);

  return (

    <button style={buttonStyles} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            <CoinbaseWalletLogo containerStyles={{ paddingRight: 10 }} />
            {account.isConnected ? `Connected` : "Create Wallet"}
          </div>
        </Gradient>
      </div>
    </button>
  );
}