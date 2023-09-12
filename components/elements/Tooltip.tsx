import styled from "@emotion/styled";
import { Button } from "rsuite";

interface Props {
  asset: {
    name: string;
    type: string;
    subtype: string;
    commodity: string;
    capacity: number;
    operator: string;
    status: string;
    lastValidation: string;
  };
}

export default function Tooltip(props: Props) {
  const { asset } = props;

  return (
    <Container>
      <Title className="title">{asset.name}</Title>
      <Content>
        <Line>
          <Header>Type</Header>
          <p>{asset.type}</p>
        </Line>
        <Line>
          <Header>Subtype</Header>
          <p>{asset.subtype}</p>
        </Line>
        <Line>
          <Header>Commodity</Header>
          <p>{asset.commodity}</p>
        </Line>
        <Line>
          <Header>Capacity</Header>
          <p>{asset.capacity}</p>
        </Line>
        <Line>
          <Header>Operator</Header>
          <p>{asset.operator}</p>
        </Line>
        <Line>
          <Header>Status</Header>
          <p>{asset.status}</p>
        </Line>
        <Line>
          <Header>Last Validation</Header>
          <p>{asset.lastValidation}</p>
        </Line>

        {/* //todo add onclick : reroute to asset page with id */}
        <Button appearance="primary" color="blue" size="md">
          Edit
        </Button>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  min-width: 240px;
`;

const Title = styled.div`
  width: 100%;
  color: black;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 5px 5px 0 0;
`;

const Content = styled.div`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 5px 5px;
  padding: 2rem;
  font-size: 1rem;
  font-weight: 500;

  p {
    margin: 0;
    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 10px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #d7d7d79a;

  &:last-of-type {
    border-bottom: none;
  }
`;
