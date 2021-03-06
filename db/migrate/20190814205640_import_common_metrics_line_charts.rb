# frozen_string_literal: true

class ImportCommonMetricsLineCharts < ActiveRecord::Migration[5.2]
  DOWNTIME = false

  def up
    ::Gitlab::DatabaseImporters::CommonMetrics::Importer.new.execute
  end

  def down
    # no-op
  end
end
