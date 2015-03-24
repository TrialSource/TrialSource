class AddActiveToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :active, :string
  end
end
