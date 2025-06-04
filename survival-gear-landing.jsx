import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const SurvivalGearLanding = () => {
  return (
    <div className="container py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6">Essential Survival Gear</h1>
        <p className="text-lg text-gray-700 text-center">
          Equip yourself for any adventure with our curated selection of high-quality survival gear.
        </p>
        <Image
          src="/images/survival-gear-hero.jpg"
          alt="Survival Gear"
          width={1200}
          height={400}
          className="w-full h-64 object-cover rounded-xl mt-8" />
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Interactive Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tool Card 1 */}
          <Card
            className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
            <CardHeader>
              <CardTitle>First Aid Kit</CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="space-y-6 flex-1">
                <p className="text-gray-700">
                  A comprehensive first aid kit is crucial for treating injuries in the wilderness.
                </p>
                <ul>
                  <li>Bandages</li>
                  <li>Antiseptic wipes</li>
                  <li>Pain relievers</li>
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg py-3">
                  Explore First Aid Kits
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tool Card 2 */}
          <Card
            className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
            <CardHeader>
              <CardTitle>Water Filter</CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="space-y-6 flex-1">
                <p className="text-gray-700">
                  Access to clean water is essential for survival. A portable water filter can purify water from various
                  sources.
                </p>
                <ul>
                  <li>Removes bacteria</li>
                  <li>Reduces sediment</li>
                  <li>Lightweight and portable</li>
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg py-3">
                  Find Water Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tool Card 3 */}
          <Card
            className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
            <CardHeader>
              <CardTitle>Navigation Tools</CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="space-y-6 flex-1">
                <p className="text-gray-700">
                  Stay on course with reliable navigation tools. A compass and map are essential for wilderness
                  exploration.
                </p>
                <ul>
                  <li>Compass</li>
                  <li>Map</li>
                  <li>GPS device (optional)</li>
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg py-3">
                  Shop Navigation Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What should I pack in my survival kit?</AccordionTrigger>
            <AccordionContent>
              Your survival kit should include essential items such as a first aid kit, water filter, navigation tools,
              food, shelter, and fire-starting equipment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I purify water in the wilderness?</AccordionTrigger>
            <AccordionContent>
              You can purify water by boiling it, using a water filter, or treating it with purification tablets.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What are the most important skills for survival?</AccordionTrigger>
            <AccordionContent>
              Essential survival skills include fire starting, shelter building, navigation, first aid, and finding food
              and water.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

export default SurvivalGearLanding
