import { useQuery } from "@apollo/client"
import { Col, Row } from "reactstrap"
import { INTRODUCTION } from "../queries"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export const Homepage = () => {
  const { data } = useQuery(INTRODUCTION)

  return (
    <Row>
      <Col>
        <div>
          <h5>Homepage</h5>
          {data?.introduction?.Data && (
            <BlocksRenderer content={data?.introduction?.Data} />
          )}
        </div>
      </Col>
    </Row>
  )
}