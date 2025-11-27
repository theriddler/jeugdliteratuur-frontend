import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Link, useNavigate } from "react-router";
import { Card, CardBody } from "reactstrap";
import { LemmaEntity } from "../gql/graphql";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";

export const LemmaOverview = (props: {
  lemma: Partial<LemmaEntity>,
  showGroupBadge?: boolean
}) => {
  const navigate = useNavigate();

  if (!props.lemma) return null;
  const { id, attributes } = props.lemma;

  const imageUrl = getOptimizedPhotoUrlFromPhotoEntry(attributes?.afbeelding?.data?.attributes);

  return (
    <Card className="clickable card-hover h-100" onClick={() => navigate(`/teksten/${id}`)}>
      <CardBody>
        <div className="h-100 lemma-overview">
          <div>
            {props.showGroupBadge && (
              <div className="mb-1">
                <span className="badge bg-primary">
                  {attributes?.niveau?.data?.attributes?.titel}
                </span>
              </div>
            )}
            <div>
              <div>
                <span className="fw-bold">{attributes?.titel}</span>
                <span className="ms-2">({attributes?.jaar})</span>
              </div>
              <div className="text-secondary">
                {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
              </div>
              {attributes?.auteur_2_voornaam && (

                <div className="text-secondary">
                  {attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam}
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="image-wrapper lemma-overview">
              <img src={imageUrl} />
            </div>
          </div>
          <div>
            <div>
              {attributes?.korte_intro && (
                <BlocksRenderer content={attributes?.korte_intro} />
              )}
            </div>
          </div>
          <div>
            <Link to={`/teksten/${id}`}>
              Verder lezen
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}