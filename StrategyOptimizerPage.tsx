import styled from "styled-components";

import { OptimizerConfig } from "@/features/optimizer/OptimizerConfig";

const Page = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: 100%;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  min-height: 0;
  height: 100%;
`;

export function StrategyOptimizerPage() {
  return (
    <Page>
      <Content>
        <OptimizerConfig />
      </Content>
    </Page>
  );
}
