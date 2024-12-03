import propTypes from "prop-types";

const CardDataStats = ({
  children,
  total,
  title,
}) => {
  return (
    <div className="rounded-sm border border-gray-100 bg-white py-6 px-7 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
        {children}
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-bold text-primary">{total}</h4>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

CardDataStats.propTypes = {
  children: propTypes.node,
  total: propTypes.string,
  title: propTypes.string,
  levelUp: propTypes.bool,
  levelDown: propTypes.bool,
  rate: propTypes.string,
};

export default CardDataStats;
