import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type Kind = "hero" | "category" | "lens" | "exploded" | "coverage" | "product";
type Props = { kind: Kind; type?: string; color?: string };
const white = "#dce7ed",
  dark = "#071422",
  cyan = "#36c7eb";
function Box({
  args = [1, 1, 1],
  position = [0, 0, 0],
  color = white,
  radius = 0.09,
}: {
  args?: [number, number, number];
  position?: [number, number, number];
  color?: string;
  radius?: number;
}) {
  return (
    <RoundedBox args={args} position={position} radius={radius} smoothness={3}>
      <meshStandardMaterial color={color} metalness={0.38} roughness={0.3} />
    </RoundedBox>
  );
}
function Lens({
  size = 1,
  position = [0, 0, 0],
}: {
  size?: number;
  position?: [number, number, number];
}) {
  return (
    <group position={position} scale={size}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.23, 48]} />
        <meshStandardMaterial color={dark} metalness={0.8} roughness={0.21} />
      </mesh>
      {[0.35, 0.29, 0.2].map((r, i) => (
        <mesh key={r} position={[0, 0, 0.13 + i * 0.018]}>
          <torusGeometry args={[r, 0.017, 8, 48]} />
          <meshStandardMaterial
            color={i === 1 ? cyan : "#607f96"}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.25, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#103d65"
          metalness={0.65}
          roughness={0.06}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[-0.08, 0.1, 0.375]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#90d8ff" />
      </mesh>
    </group>
  );
}
function Camera({
  type = "bullet",
  color = white,
}: {
  type?: string;
  color?: string;
}) {
  const t = type.toLowerCase();
  if (/nvr|dvr|record|kit|کیت|ضبط/.test(t))
    return (
      <group>
        <Box args={[2.2, 0.36, 1.25]} color="#1c2b39" />
        <Box
          args={[2.13, 0.25, 0.045]}
          position={[0, 0, 0.65]}
          color="#0b1520"
        />
        {[-0.85, -0.65].map((x) => (
          <mesh key={x} position={[x, 0, 0.68]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={cyan} />
          </mesh>
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <Box
            key={i}
            args={[0.018, 0.1, 0.02]}
            position={[0.1 + i * 0.11, 0, 0.683]}
            color="#587183"
            radius={0.003}
          />
        ))}
      </group>
    );
  if (/network|poe|شبکه/.test(t))
    return (
      <group>
        <Box args={[2, 0.43, 1]} color="#1d3344" />
        {Array.from({ length: 8 }, (_, i) => (
          <Box
            key={i}
            args={[0.13, 0.13, 0.03]}
            position={[-0.77 + i * 0.22, 0, 0.52]}
            color="#030b10"
            radius={0.01}
          />
        ))}
      </group>
    );
  if (/hard|storage|هارد/.test(t))
    return (
      <group rotation={[-0.15, 0.2, 0]}>
        <Box args={[1.15, 1.65, 0.25]} color="#536879" />
        <mesh position={[0, 0.16, 0.14]}>
          <circleGeometry args={[0.44, 40]} />
          <meshStandardMaterial
            color="#bac6cc"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        <Box
          args={[0.45, 0.2, 0.04]}
          position={[0.1, -0.56, 0.15]}
          color="#123830"
        />
      </group>
    );
  if (/access|cable|پایه|جانبی/.test(t))
    return (
      <group>
        <mesh rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.65, 0.12, 12, 56]} />
          <meshStandardMaterial color="#16323c" roughness={0.55} />
        </mesh>
        <Box
          args={[0.5, 0.9, 0.15]}
          position={[0.3, -0.35, 0.1]}
          color={color}
        />
      </group>
    );
  if (/ptz|گردان/.test(t))
    return (
      <group>
        <Box args={[0.32, 1.4, 0.35]} position={[0.6, 0.8, -0.1]} />
        <Box args={[1.1, 0.2, 0.35]} position={[0.15, 1.45, -0.1]} />
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.42, 0.65, 1.05, 48]} />
          <meshStandardMaterial
            color={color}
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.1, 0]}>
          <sphereGeometry
            args={[0.65, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial
            color="#0d1d2b"
            metalness={0.55}
            roughness={0.18}
          />
        </mesh>
        <Lens size={0.88} position={[0, -0.15, 0.39]} />
      </group>
    );
  if (/dome|turret|دام|تورت|fish|پانوراما/.test(t))
    return (
      <group>
        <mesh position={[0, 0.43, 0]}>
          <cylinderGeometry args={[0.79, 0.81, 0.23, 48]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.35, 0]}>
          <sphereGeometry
            args={[0.72, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshPhysicalMaterial
            color="#102333"
            metalness={0.5}
            roughness={0.15}
            clearcoat={1}
          />
        </mesh>
        <Lens size={0.85} position={[0, -0.03, 0.49]} />
      </group>
    );
  if (/indoor|wifi|battery|door|داخلی|باتری|زنگ|بی‌سیم/.test(t))
    return (
      <group>
        <Box
          args={[0.83, 1.3, 0.64]}
          position={[0, 0.3, 0]}
          color={color}
          radius={0.27}
        />
        <Box
          args={[0.7, 0.78, 0.05]}
          position={[0, 0.5, 0.34]}
          color="#112537"
          radius={0.2}
        />
        <Lens size={0.52} position={[0, 0.59, 0.37]} />
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.45, 24]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0, -0.73, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.09, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    );
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.49, 0.45, 1.65, 48]} />
        <meshStandardMaterial color={color} metalness={0.25} roughness={0.32} />
      </mesh>
      <Box args={[1.1, 0.08, 1.75]} position={[0, 0.44, -0.2]} color={color} />
      <Box
        args={[0.84, 0.69, 0.09]}
        position={[0, 0, 0.64]}
        color="#0c1b2a"
        radius={0.13}
      />
      <Lens size={0.78} position={[0, 0, 0.72]} />
      <Box args={[0.2, 0.56, 0.2]} position={[0, -0.65, -0.72]} color={color} />
      <mesh position={[0, -0.97, -0.72]}>
        <cylinderGeometry args={[0.36, 0.36, 0.09, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/solar|cellular|4g|خورشیدی|سیم/.test(t) && (
        <>
          <Box
            args={[1.4, 0.07, 1]}
            position={[0, 0.85, -0.3]}
            color="#183b5e"
          />
          <Box
            args={[0.035, 1, 0.035]}
            position={[0.65, 0.62, -0.6]}
            color="#101c29"
          />
        </>
      )}
    </group>
  );
}
function Animated({
  kind,
  type,
  color,
  progress,
  reduced,
}: {
  kind: Kind;
  type?: string;
  color?: string;
  progress: React.RefObject<number>;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const parts = useRef<(THREE.Group | null)[]>([]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const p = reduced ? 0.35 : (progress.current ?? 0);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      (kind === "lens" || kind === "exploded" ? -1.0 + p * 0.35 : (p - 0.5) * (kind === "hero" ? 0.55 : 0.9)) +
        (hovered && !reduced ? 0.18 : 0),
      5,
      delta,
    );
    if (kind === "lens" || kind === "exploded")
      parts.current.forEach((part, i) => {
        if (part)
          part.position.z = THREE.MathUtils.damp(
            part.position.z,
            (kind === "exploded"
              ? [0, 0.72, 0.15, -0.65, -0.5][i]
              : (i - 2) * 0.12) +
              (kind === "exploded"
                ? [-2.4, 2.2, 1.3, 0.6, -3.3][i]
                : (i - 2) * 0.72) *
                p,
            5,
            delta,
          );
      });
    if (kind === "hero")
      group.current.children.forEach((child, i) => {
        child.rotation.y = (p - 0.5) * (i % 2 ? -0.7 : 0.7);
        child.position.y =
          (i === 0
            ? 0.18
            : i === 1
              ? 0.35
              : i === 2
                ? -0.6
                : i === 3
                  ? -0.85
                  : 0.35) +
          Math.sin(p * Math.PI + i) * 0.12;
      });
    if (kind === "coverage") {
      group.current.rotation.y = -0.35 + p * 0.5;
      const cone = group.current.getObjectByName("cone");
      if (cone) cone.scale.setScalar(0.6 + p * 0.45);
    }
  });
  return (
    <group
      ref={group}
      scale={kind === "exploded" ? 1.35 : kind === "lens" ? 1.35 : 1}
      rotation={[0, -0.12, 0]}
      onPointerOver={() => {
        if (kind === "product") setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        if (kind === "product") setHovered((v) => !v);
      }}
    >
      {kind === "hero" ? (
        <>
          {["ptz", "bullet", "dome", "nvr", "indoor"].map((t, i) => (
            <group
              key={t}
              position={
                [
                  [0.0, 0.18, 0],
                  [-2.25, 0.35, -0.5],
                  [2.1, -0.6, 0.35],
                  [-0.8, -0.85, 1.3],
                  [2.1, 0.35, -1],
                ][i] as [number, number, number]
              }
              scale={[1.12, 0.93, 0.94, 1, 0.78][i]}
              rotation={[0, [-0.1, 0.35, -0.4, -0.2, -0.3][i], 0]}
            >
              <Camera type={t} />
              <mesh
                position={[
                  0,
                  t === "ptz"
                    ? -1.12
                    : t === "bullet"
                      ? -1.1
                      : t === "nvr"
                        ? -0.3
                        : -0.9,
                  0,
                ]}
              >
                <cylinderGeometry args={[1.05, 1.1, 0.15, 48]} />
                <meshStandardMaterial
                  color="#16394b"
                  metalness={0.65}
                  roughness={0.3}
                />
              </mesh>
            </group>
          ))}
        </>
      ) : null}
      {(kind === "product" || kind === "category") && (
        <group scale={kind === "category" ? 1.5 : 1.25}>
          <Camera type={type} color={color} />
        </group>
      )}
      {kind === "lens" &&
        [0, 1, 2, 3, 4].map((_, i) => (
          <group
            key={i}
            ref={(el) => {
              parts.current[i] = el;
            }}
            rotation={[0, 0, i * 0.15]}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry
                args={[1.15 - i * 0.065, 1.15 - i * 0.065, 0.2, 64, 1, true]}
              />
              <meshStandardMaterial
                color={i === 4 ? white : "#273e50"}
                metalness={0.8}
                roughness={0.22}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh>
              <circleGeometry args={[0.97 - i * 0.06, 64]} />
              <meshPhysicalMaterial
                color={i % 2 ? "#255e7a" : "#102b57"}
                transparent
                opacity={0.5}
                metalness={0.4}
                roughness={0.08}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[1.05 - i * 0.06, 0.035, 12, 64]} />
              <meshStandardMaterial
                color={i === 1 ? cyan : "#748d9f"}
                metalness={0.85}
                roughness={0.15}
              />
            </mesh>
          </group>
        ))}
      {kind === "exploded" && (
        <>
          {[
            <Box args={[1.45, 1.12, 1.25]} color={white} />,
            <Lens size={1.1} />,
            <Box args={[0.75, 0.72, 0.08]} color="#0c5749" />,
            <>
              <Box args={[1.2, 0.94, 0.12]} color="#728899" />
              <Box
                args={[0.34, 0.33, 0.16]}
                position={[0, 0, 0.13]}
                color="#171d34"
              />
            </>,
            <>
              <Box args={[0.21, 0.7, 0.2]} position={[0, -0.6, 0]} />
              <Box args={[0.65, 0.12, 0.6]} position={[0, -1, 0]} />
            </>,
          ].map((el, i) => (
            <group
              key={i}
              ref={(node) => {
                parts.current[i] = node;
              }}
            >
              {el}
            </group>
          ))}
        </>
      )}
      {kind === "coverage" && (
        <group scale={0.85}>
          <Box args={[5, 0.15, 4]} position={[0, -1, 0]} color="#294353" />
          <Box args={[5, 2, 0.13]} position={[0, 0, -2]} color="#6e8290" />
          <Box args={[0.13, 2, 4]} position={[-2.5, 0, 0]} color="#4b6476" />
          <Box
            args={[1.8, 0.8, 0.9]}
            position={[-0.8, -0.5, -0.8]}
            color="#263c51"
          />
          <Box
            args={[1.8, 0.2, 1]}
            position={[-0.8, -0.01, -0.8]}
            color="#8cabb6"
          />
          <Box
            args={[0.85, 0.95, 0.7]}
            position={[1.5, -0.42, 0.2]}
            color="#507181"
          />
          <Box
            args={[1.4, 0.03, 1.25]}
            position={[0.4, -0.9, 0.65]}
            color="#3d7278"
          />
          <group
            position={[-2, 1.05, -1.5]}
            scale={0.32}
            rotation={[0, 0.7, 0]}
          >
            <Camera type="bullet" />
          </group>
          <mesh
            name="cone"
            position={[-0.4, 0.1, 0.0]}
            rotation={[0.9, 0, -0.75]}
          >
            <coneGeometry args={[1.9, 3.8, 40, 1, true]} />
            <meshBasicMaterial
              color={cyan}
              transparent
              opacity={0.14}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div
        className="scene-fallback"
        style={{ padding: "2rem", color: "#8ecddd" }}
      >
        نمای سه‌بعدی در این مرورگر در دسترس نیست؛ اطلاعات محصولات همچنان قابل
        بررسی است.
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function Scene({ kind, type, color }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const change = () => setReduced(q.matches);
    q.addEventListener("change", change);
    const update = () => {
      const r = container.current?.getBoundingClientRect();
      if (r) {
        progress.current = THREE.MathUtils.clamp(
          (innerHeight - r.top) / (innerHeight + r.height),
          0,
          1,
        );
        container.current!.dataset.progress = progress.current.toFixed(3);
        container.current!.style.setProperty(
          "--scene-progress",
          String(progress.current),
        );
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    if (container.current) obs.observe(container.current);
    return () => {
      q.removeEventListener("change", change);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      obs.disconnect();
    };
  }, []);
  return (
    <div
      ref={container}
      className={`scene scene-${kind}`}
      role="img"
      aria-label={
        kind === "hero"
          ? "نمای سه‌بعدی مجموعه دوربین و تجهیزات نظارتی"
          : kind === "coverage"
            ? "نمای سه‌بعدی محدوده تقریبی دید دوربین"
            : kind === "lens"
              ? "نمای سه‌بعدی اجزای عدسی دوربین"
              : kind === "exploded"
                ? "نمای نمایشی اجزای دوربین"
                : "نمای سه‌بعدی محصول"
      }
      style={{
        width: "100%",
        height: "100%",
        minHeight: kind === "product" ? 200 : 240,
      }}
    >
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={active ? "always" : "never"}
          camera={{
            position: [0, kind === "hero" ? 2 : 1.2, kind === "hero" ? 9 : 7],
            fov: 38,
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[3, 5, 5]}
            intensity={3}
            color="#eef8ff"
          />
          <pointLight
            position={[-4, 1, 3]}
            intensity={35}
            color={color || cyan}
          />
          <pointLight position={[4, 2, -3]} intensity={24} color="#3971cb" />
          <Suspense fallback={null}>
            <Animated
              kind={kind}
              type={type}
              color={color}
              progress={progress}
              reduced={reduced}
            />
            {kind !== "coverage" && (
              <ContactShadows
                position={[0, kind === "hero" ? -2 : -1.5, 0]}
                opacity={0.45}
                scale={12}
                blur={2.5}
                far={5}
                resolution={128}
              />
            )}
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
