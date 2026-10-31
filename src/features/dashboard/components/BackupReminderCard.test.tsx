import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { useBackupStatusStore } from "@/database/backupStatusStore";
import BackupReminderCard from "./BackupReminderCard";

function renderCard(transactionCount: number) {
  return render(
    <MemoryRouter>
      <BackupReminderCard transactionCount={transactionCount} />
    </MemoryRouter>
  );
}

describe("BackupReminderCard", () => {
  beforeEach(() => {
    useBackupStatusStore.setState({ lastBackupAt: null, snoozedUntil: null });
  });

  it("renders nothing for a nearly empty account", () => {
    const { container } = renderCard(2);
    expect(container).toBeEmptyDOMElement();
  });

  it("nudges a user with data and no backup, then hides after snooze", () => {
    renderCard(10);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/settings");

    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(useBackupStatusStore.getState().snoozedUntil).not.toBeNull();
  });

  it("stays hidden right after a backup", () => {
    useBackupStatusStore.getState().markBackedUp();
    const { container } = renderCard(10);
    expect(container).toBeEmptyDOMElement();
  });
});
