import { Col, Row } from "reactstrap"

export const Homepage = () => {
  // const { data } = useQuery(INTRODUCTION);

  // if (!data?.inleiding?.data?.attributes?.tekst) return null;
  // const { tekst } = data.inleiding.data.attributes.tekst;

  return (
    <Row>
      <Col>
        <div>
          <h5>Homepage</h5>
          {/* {tekst && (
            <BlocksRenderer content={tekst} />
          )} */}
        </div>
      </Col>
    </Row>
  )
}