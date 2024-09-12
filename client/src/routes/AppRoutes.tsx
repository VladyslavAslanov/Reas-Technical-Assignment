import React, { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const FormPage = lazy(() => import("../components/FormPage"))

const AppRoutes: React.FC = () => {
	return (
		<Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
			<Routes>
				<Route path="/request-real-estate" element={<FormPage />} />
				<Route path="/" element={<Navigate to="/request-real-estate" />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoutes
