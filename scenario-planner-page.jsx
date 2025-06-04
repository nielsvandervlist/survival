"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Clock,
  Target,
  Shield,
  Zap,
  TrendingDown,
  CheckCircle,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { scenarios } from "./data/scenarios";

export default function ScenarioPlannerPage() {
  const [selectedScenario, setSelectedScenario] = useState(null)

  const getLikelihoodColor = (likelihood) => {
    switch (likelihood) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "bg-blue-500"
      case "medium":
        return "bg-orange-500"
      case "high":
        return "bg-red-500"
      case "extreme":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header currentPage="scenario-planner" />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Emergency Scenario Planner
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Select an emergency scenario to get customized preparedness recommendations, strategies, and potential
            challenges. Plan for the unexpected with expert guidance.
          </p>
        </div>

        {!selectedScenario ? (
          /* Scenario Selection */
          (<div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Scenario</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Select an emergency scenario to receive detailed preparedness recommendations tailored to that specific
                situation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedScenario(scenario)}>
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${scenario.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-4xl">{scenario.icon}</span>
                    </div>
                    <CardTitle className="text-xl text-slate-900 mb-2">{scenario.name}</CardTitle>
                    <p className="text-slate-600 text-sm leading-relaxed">{scenario.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Duration</div>
                        <div className="text-sm font-medium text-slate-700">{scenario.duration}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Likelihood</div>
                        <Badge
                          className={`${getLikelihoodColor(scenario.likelihood)} text-white text-xs`}>
                          {scenario.likelihood}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Severity</div>
                        <Badge className={`${getSeverityColor(scenario.severity)} text-white text-xs`}>
                          {scenario.severity}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">Primary Threats:</div>
                      <div className="flex flex-wrap gap-1">
                        {scenario.primaryThreats.slice(0, 3).map((threat, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-slate-300 text-slate-600">
                            {threat}
                          </Badge>
                        ))}
                        {scenario.primaryThreats.length > 3 && (
                          <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                            +{scenario.primaryThreats.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group-hover:shadow-lg transition-all">
                      Plan for This Scenario
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>)
        ) : (
          /* Scenario Details */
          (<div className="space-y-8">
            {/* Back Button and Header */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSelectedScenario(null)}
                className="text-slate-600 hover:text-slate-900">
                ← Back to Scenarios
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-300 text-slate-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Plan
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            {/* Scenario Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${selectedScenario.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{selectedScenario.icon}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-3xl text-slate-900 mb-2">{selectedScenario.name}</CardTitle>
                    <p className="text-slate-600 text-lg leading-relaxed">{selectedScenario.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900">Duration</div>
                    <div className="text-sm text-slate-600">{selectedScenario.duration}</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900">Likelihood</div>
                    <Badge
                      className={`${getLikelihoodColor(selectedScenario.likelihood)} text-white mt-1`}>
                      {selectedScenario.likelihood}
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900">Severity</div>
                    <Badge
                      className={`${getSeverityColor(selectedScenario.severity)} text-white mt-1`}>
                      {selectedScenario.severity}
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900">Timeframe</div>
                    <div className="text-sm text-slate-600">{selectedScenario.timeframe}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gear">Gear</TabsTrigger>
                <TabsTrigger value="strategies">Strategies</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primary Threats */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Primary Threats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedScenario.primaryThreats.map((threat, index) => (
                          <li key={index} className="flex items-center gap-2 text-slate-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Affected Services */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        Affected Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedScenario.affectedServices.map((service, index) => (
                          <li key={index} className="flex items-center gap-2 text-slate-700">
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Considerations */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      Key Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedScenario.keyConsiderations.map((consideration, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{consideration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gear" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Essential Gear */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        Essential Gear
                      </CardTitle>
                      <p className="text-sm text-slate-600">Must-have items for survival</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedScenario.recommendedGear.essential.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Important Gear */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full" />
                        Important Gear
                      </CardTitle>
                      <p className="text-sm text-slate-600">High priority items</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedScenario.recommendedGear.important.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Optional Gear */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        Optional Gear
                      </CardTitle>
                      <p className="text-sm text-slate-600">Nice to have items</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedScenario.recommendedGear.optional.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="strategies" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Immediate Actions */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Immediate Actions
                      </CardTitle>
                      <p className="text-sm text-slate-600">First 24-72 hours</p>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {selectedScenario.strategies.immediate.map((action, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div
                              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-slate-700">{action}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Short-term Actions */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-500" />
                        Short-term Actions
                      </CardTitle>
                      <p className="text-sm text-slate-600">First weeks to months</p>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {selectedScenario.strategies.shortTerm.map((action, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div
                              className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-slate-700">{action}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Long-term Actions */}
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        Long-term Actions
                      </CardTitle>
                      <p className="text-sm text-slate-600">Recovery and rebuilding</p>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {selectedScenario.strategies.longTerm.map((action, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div
                              className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-slate-700">{action}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedScenario.challenges.map((challenge, index) => (
                    <Card
                      key={index}
                      className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-slate-900 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          {challenge.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Challenge:</h4>
                          <p className="text-slate-700 text-sm leading-relaxed">{challenge.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Mitigation:</h4>
                          <p className="text-slate-700 text-sm leading-relaxed">{challenge.mitigation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Response Timeline</CardTitle>
                    <p className="text-slate-600">Recommended actions by timeframe</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Immediate Timeline */}
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">Immediate Response</h3>
                            <p className="text-sm text-slate-600">First 24-72 hours</p>
                          </div>
                        </div>
                        <div className="ml-16 space-y-2">
                          {selectedScenario.strategies.immediate.map((action, index) => (
                            <div key={index} className="flex items-center gap-2 text-slate-700">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Short-term Timeline */}
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">Short-term Response</h3>
                            <p className="text-sm text-slate-600">Weeks to months</p>
                          </div>
                        </div>
                        <div className="ml-16 space-y-2">
                          {selectedScenario.strategies.shortTerm.map((action, index) => (
                            <div key={index} className="flex items-center gap-2 text-slate-700">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Long-term Timeline */}
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">Long-term Recovery</h3>
                            <p className="text-sm text-slate-600">Months to years</p>
                          </div>
                        </div>
                        <div className="ml-16 space-y-2">
                          {selectedScenario.strategies.longTerm.map((action, index) => (
                            <div key={index} className="flex items-center gap-2 text-slate-700">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Prepare?</h3>
                <p className="text-slate-700 mb-6 text-lg">
                  Start building your emergency preparedness plan with our recommended gear and supplies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3">
                    Shop Recommended Gear
                  </Button>
                  <Button variant="outline" className="border-slate-300 text-slate-700 px-8 py-3">
                    View Preparedness Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>)
        )}
      </div>
      <Footer />
    </div>
  );
}
