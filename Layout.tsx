import { forwardRef, HTMLAttributes, PointerEventHandler } from "react";
import styled from "styled-components";

type LayoutRootProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
};

type SplitHandleProps = HTMLAttributes<HTMLDivElement> & {
  dragging?: boolean;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
};

const LayoutRoot = styled.div<{ $ratio: number }>`
  display: grid;
  grid-template-columns: ${(props) => `${props.$ratio}fr 24px ${Math.max(1 - props.$ratio, 0.01)}fr`};
  grid-template-rows: minmax(0, 1fr);
  align-items: stretch;
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  height: 100%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const PanelBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;

const SplitHandleRoot = styled.div<{ $dragging: boolean }>`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 24px;
  border-radius: 999px;
  background: ${(props) => (props.$dragging ? props.theme.primary : props.theme.border)};
  opacity: ${(props) => (props.$dragging ? 0.9 : 0.7)};
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  transition: background 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const HandleGripRoot = styled.span`
  display: block;
  width: 3px;
  height: 32px;
  border-radius: 3px;
  background: ${(props) => props.theme.surface};
  box-shadow: 0 0 0 1px ${(props) => props.theme.border};
`;

const LeftPanelRoot = styled(PanelBase)`
  grid-column: 1;
  gap: 0;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const RightPanelRoot = styled(PanelBase).attrs({ as: "aside" })`
  grid-column: 3;
  flex: 1 1 auto;
  min-height: 0;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const StrategyOptimizerLayout = forwardRef<HTMLDivElement, LayoutRootProps>(function StrategyOptimizerLayout(
  { ratio, children, ...props },
  ref,
) {
  return (
    <LayoutRoot ref={ref} $ratio={ratio} {...props}>
      {children}
    </LayoutRoot>
  );
});

export const LeftPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function LeftPanel(
  { children, ...props },
  ref,
) {
  return (
    <LeftPanelRoot ref={ref} {...props}>
      {children}
    </LeftPanelRoot>
  );
});

export const RightPanel = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function RightPanel(
  { children, ...props },
  ref,
) {
  return (
    <RightPanelRoot ref={ref} {...props}>
      {children}
    </RightPanelRoot>
  );
});

export const SplitHandle = forwardRef<HTMLDivElement, SplitHandleProps>(function SplitHandle(
  { dragging = false, children, ...props },
  ref,
) {
  return (
    <SplitHandleRoot ref={ref} $dragging={dragging} {...props}>
      {children}
    </SplitHandleRoot>
  );
});

export const HandleGrip = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function HandleGrip(
  { children, ...props },
  ref,
) {
  return (
    <HandleGripRoot ref={ref} {...props}>
      {children}
    </HandleGripRoot>
  );
});
