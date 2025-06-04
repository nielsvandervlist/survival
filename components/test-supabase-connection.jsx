"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TestSupabaseConnection() {
  const [connectionStatus, setConnectionStatus] = useState("testing")
  const [error, setError] = useState(null)

  const testConnection = async () => {
    setConnectionStatus("testing")
    setError(null)

    try {
      const { data, error } = await supabase.from("profiles").select("count").limit(1)
      if (error) throw error

      setConnectionStatus("connected")
    } catch (err) {
      setConnectionStatus("error")
      setError(err?.message || "Unknown error")
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              connectionStatus === "testing"
                ? "bg-yellow-500"
                : connectionStatus === "connected"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
          <span>
            {connectionStatus === "testing"
              ? "Testing connection..."
              : connectionStatus === "connected"
              ? "Connected successfully!"
              : "Connection failed"}
          </span>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button onClick={testConnection} className="w-full">
          Test Again
        </Button>
      </CardContent>
    </Card>
  )
}
