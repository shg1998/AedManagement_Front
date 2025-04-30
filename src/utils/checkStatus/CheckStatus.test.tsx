import React from "react";
import { render, screen } from "@testing-library/react";
import CheckStatus from "./CheckStatus";

describe("CheckStatus component", () => {
    it("renders 'فعال' text and green check icon for status 'active'", () => {
        render(<CheckStatus status="active" />);
        expect(screen.getByText("فعال")).toBeInTheDocument();
        expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("warning-icon")).not.toBeInTheDocument();
    });

    it("renders 'غیر فعال' text and red cancel icon for status 'deactive'", () => {
        render(<CheckStatus status="deactive" />);
        expect(screen.getByText("غیر فعال")).toBeInTheDocument();
        expect(screen.getByTestId("cancel-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("check-circle-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("warning-icon")).not.toBeInTheDocument();
    });

    it("renders 'تعلیق موقت' text and orange warning icon for status 'temporary_suspension'", () => {
        render(<CheckStatus status="temporary_suspension" />);
        expect(screen.getByText("تعلیق موقت")).toBeInTheDocument();
        expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("check-circle-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
    });

    it("renders 'تعلیق دائم' text and orange warning icon for unknown status", () => {
        render(<CheckStatus status="unknown_status" />);
        expect(screen.getByText("تعلیق دائم")).toBeInTheDocument();
        expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("check-circle-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
    });
});