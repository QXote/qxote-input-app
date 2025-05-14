import { Button } from "@/components/ui/button";

export default function StepThree() {
  const dummyData = {
    datum: "2025-05-14",
    tijd: "10:30",
    flora: "Lavandula angustifolia",
    klasse: "Kruidachtig",
    dekking: "80"
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost/api/save.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dummyData)
      });

      const result = await response.json();
      if (result.success) {
        alert("Opgeslagen!");
      } else {
        alert("Fout bij opslaan.");
      }
    } catch (err) {
      console.error("Fout:", err);
    }
  };

  return (
    <>
      <div>TEST 122213</div>
      <Button variant="outline" onClick={handleSave}>
        Mooie button
      </Button>
    </>
  );
}
