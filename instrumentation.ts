import { NodeSDK } from "@opentelemetry/sdk-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node"

const sdk = new NodeSDK({
	spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter())]
});

sdk.start();
