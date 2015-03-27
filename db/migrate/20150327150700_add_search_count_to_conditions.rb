class AddSearchCountToConditions < ActiveRecord::Migration
  def change
    add_column :conditions, :number_of_searches, :integer
  end
end
