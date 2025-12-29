import { useData } from "@shared/hooks/useData";
import type { Activation } from "@features/activation/model/types";
import { useParams } from "react-router-dom";
import { createApiUrl } from "@shared/config/api";
import { Error, Loader, Table } from "@shared/ui";
import { parseRouteParams } from "@features/home/model/tabs";
import Header from "@shared/components/Header/Header";

export const CurrentParams = () => {
  const params = useParams<{ type?: string; id?: string }>();
  const { id } = parseRouteParams(params.type, params.id);

  const { data, loading, error } = useData<Activation>(createApiUrl(`api/mpa${id}-data`))

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <Header title={`МПА №${id}`} />
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <Table
          data={data?.temperatures}
          unit="(°C)"
          title="Температуры"
        />
        <Table
          data={data?.pressures}
          unit="(°C)"
          title="Давления/разрежения"
        />
      </div>
    </>

  )
};
