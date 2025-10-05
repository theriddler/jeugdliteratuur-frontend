import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Card, CardBody, Col, Row } from "reactstrap";
import { OVER_HET_PROJECT } from "../queries";

export const OverHetProject = () => {
  const { data } = useQuery(OVER_HET_PROJECT);

  if (!data?.overHetProject?.data?.attributes) return null;
  console.log(data.overHetProject.data.attributes)
  const { Tekst } = data.overHetProject.data.attributes;

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Over het project</h4>
          <Card>
            <CardBody>
              {Tekst && (
                <BlocksRenderer content={Tekst} />
              )}
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs={4}>
          <div className="image-wrapper xl">
            <img src={foto?.data?.attributes?.url} />
          </div>
        </Col> */}
      </Row>
    </>
  )
}