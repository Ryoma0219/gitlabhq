# frozen_string_literal: true

class AddIdentifierToPrometheusMetric < ActiveRecord::Migration[4.2]
  include Gitlab::Database::MigrationHelpers

  DOWNTIME = false

  def change
    add_column :prometheus_metrics, :identifier, :string # rubocop:disable Migration/AddLimitToStringColumns
  end
end
