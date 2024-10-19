import { registerOTel } from "@vercel/otel";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";

const spanProcessors = [new BatchSpanProcessor(new OTLPTraceExporter())];

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		registerOTel({ spanProcessors: spanProcessors });
	}
}
