// Utility function for toggling part numbers
export function togglePartNumber(
  partNo: string,
  partNumbers: string[],
  selectedPartNumbers: string[],
  setSelectedPartNumbers: (value: string[] | ((prev: string[]) => string[])) => void
) {
  if (partNo === "all") {
    if (selectedPartNumbers.length === partNumbers.length) {
      setSelectedPartNumbers([]);
    } else {
      setSelectedPartNumbers([...partNumbers]);
    }
  } else {
    setSelectedPartNumbers((prev) =>
      prev.includes(partNo)
        ? prev.filter((n) => n !== partNo)
        : [...prev, partNo]
    );
  }
}

