const PricingTable = ({
  treatments,
}: {
  treatments: { name: string; price: string }[];
}) => {
  return (
    <div className=" w-full">
      <div className="bg-white">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-4 text-text-color font-medium text-lg">
                TREATMENTS
              </th>
              <th className="text-right py-4 text-text-color font-medium text-lg">
                START FROM
              </th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="text-left py-4 text-text-color">
                  {treatment.name}
                </td>
                <td className="text-right py-4 text-text-color">
                  {treatment.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
