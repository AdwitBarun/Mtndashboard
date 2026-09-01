import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import CustomerExplorer from "./pages/CustomerExplorer"
import CustomerIdentity from "./pages/CustomerIdentity"
import DataUsage from "./pages/DataUsage"
import Travel from "./pages/Travel"
import PaymentHistory from "./pages/PaymentHistory"
import PainPoints from "./pages/PainPoints"
import NBA from "./pages/NBA"
import ContentStudio from "./pages/ContentStudio"
import Feedback from "./pages/Feedback"
import ClosedLoop from "./pages/ClosedLoop"
import Layout from "./components/Layout"

function ComingSoon({ title }: { title: string }) {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1F2937" }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            This section is coming soon.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/explorer" replace />} />
        <Route path="/explorer" element={<CustomerExplorer />} />
        <Route
          path="/hub/:customerId/identity"
          element={<CustomerIdentity />}
        />
        <Route path="/hub/:customerId/usage" element={<DataUsage />} />
        <Route path="/hub/:customerId/travel" element={<Travel />} />
        <Route path="/hub/:customerId/payments" element={<PaymentHistory />} />
        <Route path="/hub/:customerId/pain-points" element={<PainPoints />} />
        <Route path="/hub/:customerId/nba" element={<NBA />} />
        <Route
          path="/hub/:customerId/content-studio"
          element={<ContentStudio />}
        />
        <Route path="/hub/:customerId/feedback" element={<Feedback />} />
        <Route path="/hub/:customerId/closed-loop" element={<ClosedLoop />} />
        <Route path="/overview" element={<ComingSoon title="Overview" />} />
        <Route
          path="/segmentation"
          element={<ComingSoon title="Segmentation" />}
        />
        <Route path="/ml-lab" element={<ComingSoon title="ML Lab" />} />
        <Route
          path="/high-risk"
          element={<ComingSoon title="High Risk Customers" />}
        />
        <Route
          path="/value"
          element={<ComingSoon title="Value Measurement" />}
        />
        <Route path="*" element={<Navigate to="/explorer" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
