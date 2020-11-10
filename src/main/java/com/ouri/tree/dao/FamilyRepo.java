package com.ouri.tree.dao;

import java.sql.Array;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ouri.tree.Person;

@RepositoryRestResource(collectionResourceRel="persons",path="persons")
public interface FamilyRepo extends JpaRepository<Person, Integer>, FamilyRepoCustom{

	/*
	 * List<Person> findByFamilyName(String familyName);
	 * 
	 * List<Person> findByFamilyNameGreaterThan(String familyName);
	 * 
	 * @Query("from Person where firstName=?1 Order by familyName") List<Person>
	 * findByFirstNameSorted(String firstName);
	 */
	List<Person> findByFirstName(String firstName);
	
	@Query("from Person where id=?1")
	Optional<Person> findById(Integer id);
	
	@Query("from Person where birth <> NULL Order by birth") List<Person>
	findAllSorted();
	
	@Query("from Person where (?1='undefined' or firstName=?1) and (?2='undefined' or maidenName=?2) and (?3='undefined' or familyName=?3)") 
	List<Person> findByFullName(String firstName, String maidenName, String familyName);
	
	
	@Query("from Person where id in (:ids) order by birth") 
	List<Person> findByIds(@Param("ids") Collection<Integer> ids);
	
	public static final String FIND_PARENTS = "select * from Person where id in (select parent1 from couple where id = (select couple_id from offspring where person_id=1261)\r\n" + 
			"union all\r\n" + 
			"select parent2 from couple where id = (select couple_id from offspring where person_id=?1)) order by birth";
	@Query(value = FIND_PARENTS, nativeQuery = true)
	List<Person> findParentsByPerson(Integer id);
	//@Query("from Person where id in (ids=?1)") 
	//List<Person> findByIds2(Collection<Integer> ids);
	
	 
}
