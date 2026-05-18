import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const brandColors = [
  { name: 'Navy', token: '--navy', value: 'hsl(210, 35%, 15%)', cssVar: '--navy' },
  {
    name: 'Navy Foreground',
    token: '--navy-foreground',
    value: 'hsl(0, 0%, 95%)',
    cssVar: '--navy-foreground',
  },
  {
    name: 'Navy Muted',
    token: '--navy-muted',
    value: 'hsl(210, 20%, 60%)',
    cssVar: '--navy-muted',
  },
]

const semanticColors = [
  { name: 'Background', token: '--background', value: 'hsl(206, 25%, 94%)', className: 'bg-background' },
  { name: 'Foreground', token: '--foreground', value: 'hsl(210, 30%, 12%)', className: 'bg-foreground' },
  { name: 'Card', token: '--card', value: 'hsl(0, 0%, 100%)', className: 'bg-card' },
  {
    name: 'Card Foreground',
    token: '--card-foreground',
    value: 'hsl(210, 30%, 12%)',
    className: 'bg-card-foreground',
  },
  { name: 'Popover', token: '--popover', value: 'hsl(0, 0%, 100%)', className: 'bg-popover' },
  {
    name: 'Popover Foreground',
    token: '--popover-foreground',
    value: 'hsl(210, 30%, 12%)',
    className: 'bg-popover-foreground',
  },
  { name: 'Primary', token: '--primary', value: 'hsl(210, 100%, 35%)', className: 'bg-primary' },
  {
    name: 'Primary Foreground',
    token: '--primary-foreground',
    value: 'hsl(0, 0%, 100%)',
    className: 'bg-primary-foreground',
  },
  { name: 'Secondary', token: '--secondary', value: 'hsl(206, 15%, 90%)', className: 'bg-secondary' },
  {
    name: 'Secondary Foreground',
    token: '--secondary-foreground',
    value: 'hsl(210, 30%, 12%)',
    className: 'bg-secondary-foreground',
  },
  { name: 'Muted', token: '--muted', value: 'hsl(206, 15%, 92%)', className: 'bg-muted' },
  {
    name: 'Muted Foreground',
    token: '--muted-foreground',
    value: 'hsl(210, 15%, 40%)',
    className: 'bg-muted-foreground',
  },
  { name: 'Accent', token: '--accent', value: 'hsl(206, 15%, 90%)', className: 'bg-accent' },
  {
    name: 'Accent Foreground',
    token: '--accent-foreground',
    value: 'hsl(210, 30%, 12%)',
    className: 'bg-accent-foreground',
  },
  { name: 'Destructive', token: '--destructive', value: 'hsl(0, 75%, 50%)', className: 'bg-destructive' },
  {
    name: 'Destructive Foreground',
    token: '--destructive-foreground',
    value: 'hsl(0, 0%, 100%)',
    className: 'bg-destructive-foreground',
  },
  { name: 'Border', token: '--border', value: 'hsl(210, 15%, 85%)', className: 'bg-border' },
  { name: 'Input', token: '--input', value: 'hsl(210, 15%, 85%)', className: 'bg-input' },
  { name: 'Ring', token: '--ring', value: 'hsl(210, 100%, 35%)', className: 'bg-ring' },
]

const riskColors = [
  { name: 'Risk Low', token: '--risk-low', value: 'hsl(140, 60%, 45%)', cssVar: '--risk-low' },
  { name: 'Risk Medium', token: '--risk-medium', value: 'hsl(45, 95%, 55%)', cssVar: '--risk-medium' },
  { name: 'Risk High', token: '--risk-high', value: 'hsl(0, 75%, 55%)', cssVar: '--risk-high' },
]

const chartColors = [
  { name: 'Chart 1', token: '--chart-1', value: 'hsl(180, 35%, 30%)', cssVar: '--chart-1' },
  { name: 'Chart 2', token: '--chart-2', value: 'hsl(280, 60%, 45%)', cssVar: '--chart-2' },
  { name: 'Chart 3', token: '--chart-3', value: 'hsl(20, 85%, 55%)', cssVar: '--chart-3' },
  { name: 'Chart 4', token: '--chart-4', value: 'hsl(210, 100%, 50%)', cssVar: '--chart-4' },
]

function Section({ title, description, children }) {
  return (
    <section className="space-y-8 border-t pt-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function ColorSwatch({ name, token, value, className, cssVar }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-card">
      <div
        className={`h-24 w-full rounded-md border border-border ${className ?? ''}`}
        style={cssVar ? { backgroundColor: `var(${cssVar})` } : undefined}
        aria-label={`${name} color swatch`}
      />
      <div className="mt-3 space-y-1">
        <p className="font-semibold leading-none">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{token}</p>
        <p className="font-mono text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function SwatchGrid({ colors }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {colors.map((color) => (
        <ColorSwatch key={color.token} {...color} />
      ))}
    </div>
  )
}

export default function DesignSystem() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-8 py-12">
      <div className="space-y-5 pb-4">
        <Badge variant="secondary" className="rounded-md">
          ARIMO Predictive Maintenance
        </Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-base leading-7 text-muted-foreground">
            A focused foundation for industrial monitoring interfaces: brand color
            tokens, risk states, typography, and core shadcn/ui components.
          </p>
        </div>
      </div>

      <Section
        title="Brand"
        description="Core ARIMO identity colors used for navigation, sidebars, and brand surfaces."
      >
        <SwatchGrid colors={brandColors} />
      </Section>

      <Section
        title="Semantic Colors"
        description="Application-level shadcn tokens for surfaces, text, controls, borders, and focus states."
      >
        <SwatchGrid colors={semanticColors} />
      </Section>

      <Section
        title="Risk Indicators"
        description="Risk colors shown as raw tokens and as product-ready status badges."
      >
        <SwatchGrid colors={riskColors} />
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Badge examples</CardTitle>
            <CardDescription>
              Use these for asset health, failure probability, and alert severity.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge className="border-transparent bg-risk-low text-white hover:bg-risk-low/90">
              Low risk
            </Badge>
            <Badge className="border-transparent bg-risk-medium text-foreground hover:bg-risk-medium/90">
              Medium risk
            </Badge>
            <Badge className="border-transparent bg-risk-high text-white hover:bg-risk-high/90">
              High risk
            </Badge>
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Chart Colors"
        description="A compact visualization palette for trends, comparisons, and equipment telemetry."
      >
        <SwatchGrid colors={chartColors} />
      </Section>

      <Section title="Typography" description="Roboto with clear hierarchy for dense industrial dashboards.">
        <Card className="shadow-card">
          <CardContent className="space-y-8 pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 1
              </p>
              <h1 className="text-4xl font-bold tracking-tight">Fleet Reliability Overview</h1>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 2
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">Predictive Alerts</h2>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 3
              </p>
              <h3 className="text-2xl font-semibold">Equipment Health</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 4
              </p>
              <h4 className="text-xl font-medium">Pump Station A-12</h4>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 5
              </p>
              <h5 className="text-lg font-medium">Vibration Thresholds</h5>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Heading 6
              </p>
              <h6 className="text-base font-medium">Sensor Group 04</h6>
            </div>
            <Separator />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Body
                </p>
                <p className="text-base leading-7">
                  Monitor vibration, temperature, and pressure trends to anticipate
                  failures before downtime occurs.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Small
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Last model run completed 4 minutes ago.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Components"
        description="Core UI building blocks installed from shadcn/ui and tuned by the ARIMO token system."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Primary actions, secondary actions, and low-emphasis controls.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status tags for filters, state, and severity.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Alert</Badge>
              <Badge className="bg-risk-low text-white">Low</Badge>
              <Badge className="bg-risk-medium text-foreground">Medium</Badge>
              <Badge className="bg-risk-high text-white">High</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Form controls for asset metadata and thresholds.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asset-id">Asset ID</Label>
                <Input id="asset-id" placeholder="PUMP-A12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Alert threshold</Label>
                <Input id="threshold" placeholder="85%" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Cards & Avatars</CardTitle>
              <CardDescription>Surfaces and identity primitives for operators and assets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-lg border bg-background p-4">
                <p className="text-sm font-medium">Compressor C-03</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  High-risk asset with pressure variance outside expected range.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
