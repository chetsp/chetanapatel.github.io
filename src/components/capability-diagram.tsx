import type { CapabilityId } from "@/data/portfolio";
function Node({
  x,
  y,
  w = 76,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g className={accent ? "diagram-node diagram-node-accent" : "diagram-node"}>
      <rect x={x} y={y} width={w} height={32} rx={7} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}
export default function CapabilityDiagram({ kind }: { kind: CapabilityId }) {
  return (
    <svg
      className={`capability-diagram diagram-${kind}`}
      viewBox="0 0 320 150"
      fill="none"
      aria-hidden="true"
    >
      {kind === "agents" ? (
        <>
          <path
            className="diagram-wire"
            d="M75 55H112M190 55H227M150 71V100H225"
          />
          <path className="diagram-wire secondary-wire" d="M262 42V19H38V39" />
          <Node x={7} y={39} w={68} label="Input" />
          <Node x={112} y={39} w={78} label="Validate" accent />
          <Node x={227} y={39} w={86} label="Plan" />
          <Node x={225} y={84} w={88} label="Human review" />
          <text className="diagram-caption" x={8} y={132}>
            Typed state · retrieval · tool boundaries
          </text>
          <circle cx={94} cy={55} r={3} className="diagram-signal" />
          <circle cx={208} cy={55} r={3} className="diagram-signal" />
        </>
      ) : kind === "systems" ? (
        <>
          <path
            className="diagram-wire"
            d="M70 68H101V25H120M101 68H120M101 68V111H120M198 25H220V68H247M198 68H247M198 111H220V68"
          />
          <Node x={1} y={52} w={69} label="Queue" />
          <Node x={120} y={9} w={78} label="Worker 01" />
          <Node x={120} y={52} w={78} label="Worker 02" accent />
          <Node x={120} y={95} w={78} label="Worker 03" />
          <Node x={247} y={52} w={72} label="Results" />
          <text className="diagram-caption" x={3} y={147}>
            Concurrent execution · scheduling · event streams
          </text>
        </>
      ) : kind === "product" ? (
        <>
          <g className="diagram-window">
            <rect x={6} y={17} width={108} height={100} rx={8} />
            <path d="M6 37H114" />
            <circle cx={17} cy={27} r={2} />
            <circle cx={25} cy={27} r={2} />
            <circle cx={33} cy={27} r={2} />
            <rect x={18} y={49} width={57} height={5} rx={2} />
            <rect x={18} y={62} width={83} height={16} rx={3} />
            <rect x={56} y={89} width={45} height={15} rx={3} />
          </g>
          <path className="diagram-wire" d="M114 68H145M221 68H250" />
          <Node x={145} y={52} w={76} label="REST API" accent />
          <g className="diagram-storage">
            <path d="M252 45V91C252 102 309 102 309 91V45" />
            <ellipse cx={280.5} cy={45} rx={28.5} ry={9} />
            <path d="M252 65C252 77 309 77 309 65" />
          </g>
          <text className="diagram-caption" x={6} y={140}>
            Interface → validated service → persistent data
          </text>
        </>
      ) : (
        <>
          <rect
            className="diagram-cluster"
            x={9}
            y={12}
            width={176}
            height={99}
            rx={10}
          />
          <text className="diagram-caption" x={22} y={30}>
            DEPLOYMENT CLUSTER
          </text>
          <Node x={21} y={42} w={69} label="Service" />
          <Node x={103} y={42} w={69} label="Service" />
          <path
            className="diagram-wire"
            d="M56 74V91H137V74M96 91H214V62H230"
          />
          <Node x={230} y={46} w={81} label="Telemetry" accent />
          <path
            className="diagram-chart"
            d="M235 105H309M239 100V88M251 100V78M263 100V85M275 100V69M287 100V76M299 100V61"
          />
          <text className="diagram-caption" x={9} y={140}>
            Containers · relational data · metrics & traces
          </text>
        </>
      )}
    </svg>
  );
}
