import React from "react";
import { Crown, Sparkles, ArrowRight } from "lucide-react";

import Button from "../common/Button";
import "./DashbordComponent.css";

const UpgradeCard = ({
  title = "Upgrade to Pro",
  description = "Unlock AI Mock Interviews, Unlimited Tests, Personalized Roadmaps and Premium Learning Resources.",
  onUpgrade,
}) => {
  return (
    <div className="upgrade-card">

      <div className="upgrade-icon">
        <Crown size={34} />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <ul className="upgrade-features">
        <li>
          <Sparkles size={15} />
          Unlimited AI Interviews
        </li>

        <li>
          <Sparkles size={15} />
          Premium Learning Paths
        </li>

        <li>
          <Sparkles size={15} />
          Resume Builder Pro
        </li>

        <li>
          <Sparkles size={15} />
          AI Career Guidance
        </li>
      </ul>

      <Button
        variant="primary"
        className="upgrade-btn"
        icon={<ArrowRight size={17} />}
        onClick={onUpgrade}
      >
        Upgrade Now
      </Button>

    </div>
  );
};

export default UpgradeCard;